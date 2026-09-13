import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const base = 'http://127.0.0.1:3001';
const valid = { name: ' Test Studio ', email: 'test@example.com', bottleneck: ' Testing a disconnected operational workflow. ' };
const post = (origin, data, headers = {}) => fetch(`${origin}/api/intake`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, ...headers }, body: typeof data === 'string' ? data : JSON.stringify(data) });
for (const [label, data, headers, expected] of [
  ['missing required fields', {}, {}, 400],
  ['invalid email', { ...valid, email: 'invalid' }, {}, 400],
  ['invalid JSON', '{', {}, 400],
  ['honeypot', { ...valid, website: 'bot' }, {}, 400],
  ['oversized payload', 'a'.repeat(12001), {}, 413],
  ['foreign origin', valid, { Origin: 'https://example.com' }, 403],
  ['same-origin unconfigured delivery', valid, {}, 502],
]) {
  const response = await post(base, data, headers);
  assert.equal(response.status, expected, label);
  console.log(`PASS: ${label}`);
}

let inserted;
let sent;
const state = { supabase: 201, resend: 200 };
const read = async (req) => { let body = ''; for await (const chunk of req) body += chunk; return JSON.parse(body); };
const mock = createServer(async (req, res) => {
  if (req.url.startsWith('/rest/v1/intake_requests')) {
    inserted = await read(req);
    assert.equal(req.headers.apikey, 'test-service-key');
    assert.equal(req.headers.authorization, 'Bearer test-service-key');
    res.writeHead(state.supabase); res.end('{}');
    return;
  }
  if (req.url.startsWith('/emails')) {
    sent = await read(req);
    assert.equal(req.headers.authorization, 'Bearer test-resend-key');
    res.writeHead(state.resend); res.end('{}');
    return;
  }
  res.writeHead(404); res.end('{}');
});
await new Promise(resolve => mock.listen(0, '127.0.0.1', resolve));
const mockUrl = `http://127.0.0.1:${mock.address().port}`;
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3002'], { env: { ...process.env, SUPABASE_URL: mockUrl, SUPABASE_SERVICE_ROLE_KEY: 'test-service-key', RESEND_API_URL: mockUrl, RESEND_API_KEY: 'test-resend-key', INTAKE_NOTIFY_EMAIL: 'owner@example.com' }, stdio: 'ignore', windowsHide: true });
try {
  let ready = false;
  for (let i = 0; i < 40; i++) {
    try { if ((await fetch('http://127.0.0.1:3002')).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  assert.ok(ready, 'test server starts');

  const accepted = await post('http://127.0.0.1:3002', valid);
  assert.equal(accepted.status, 200); assert.equal((await accepted.json()).ok, true);
  assert.equal(inserted.name, 'Test Studio'); assert.equal(inserted.bottleneck, valid.bottleneck.trim());
  assert.equal(inserted.source, 'state-of-ashes'); assert.ok(inserted.submitted_at);
  assert.deepEqual(sent.to, ['owner@example.com']); assert.equal(sent.reply_to, 'test@example.com');
  assert.ok(sent.text.includes('Test Studio'));
  console.log('PASS: stores the normalized request and emails a notification');

  state.resend = 500;
  assert.equal((await post('http://127.0.0.1:3002', valid)).status, 200);
  console.log('PASS: a stored request still succeeds when email delivery fails');

  state.supabase = 500;
  assert.equal((await post('http://127.0.0.1:3002', valid)).status, 502);
  console.log('PASS: losing both store and email does not report success');

  state.resend = 200;
  assert.equal((await post('http://127.0.0.1:3002', valid)).status, 200);
  console.log('PASS: an emailed request still succeeds when storage fails');
} finally { child.kill(); await new Promise(resolve => mock.close(resolve)); }
