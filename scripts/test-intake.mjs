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
  ['same-origin unconfigured delivery', valid, {}, 503],
]) {
  const response = await post(base, data, headers);
  assert.equal(response.status, expected, label);
  console.log(`PASS: ${label}`);
}
let received;
let failDelivery = false;
const webhook = createServer(async (req, res) => {
  let body = ''; for await (const chunk of req) body += chunk;
  received = JSON.parse(body);
  assert.equal(req.headers.authorization, 'Bearer test-token');
  res.writeHead(failDelivery ? 500 : 200); res.end('{}');
});
await new Promise(resolve => webhook.listen(0, '127.0.0.1', resolve));
const webhookPort = webhook.address().port;
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3002'], { env: { ...process.env, INTAKE_WEBHOOK_URL: `http://127.0.0.1:${webhookPort}`, INTAKE_WEBHOOK_TOKEN: 'test-token' }, stdio: 'ignore', windowsHide: true });
try {
  let ready = false;
  for (let i = 0; i < 40; i++) {
    try { if ((await fetch('http://127.0.0.1:3002')).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  assert.ok(ready, 'test server starts');
  const accepted = await post('http://127.0.0.1:3002', valid);
  assert.equal(accepted.status, 200); assert.equal((await accepted.json()).ok, true);
  assert.equal(received.name, 'Test Studio'); assert.equal(received.bottleneck, valid.bottleneck.trim());
  assert.equal(received.source, 'state-of-ashes'); assert.ok(received.submittedAt);
  console.log('PASS: acknowledged delivery with normalized payload and authorization');
  failDelivery = true;
  assert.equal((await post('http://127.0.0.1:3002', valid)).status, 502);
  console.log('PASS: upstream failure does not report success');
} finally { child.kill(); await new Promise(resolve => webhook.close(resolve)); }
