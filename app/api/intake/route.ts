import { NextResponse } from "next/server";

type Submission = { name: string; email: string; bottleneck: string; submittedAt: string };

async function store(entry: Submission) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/intake_requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}`, Prefer: "return=minimal" },
    body: JSON.stringify({ name: entry.name, email: entry.email, bottleneck: entry.bottleneck, source: "state-of-ashes", submitted_at: entry.submittedAt }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Supabase insert failed: ${response.status} ${await response.text()}`);
  return true;
}

async function notify(entry: Submission) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.INTAKE_NOTIFY_EMAIL;
  if (!key || !to) return false;
  const escape = (value: string) => value.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
  const response = await fetch(`${process.env.RESEND_API_URL || "https://api.resend.com"}/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      from: process.env.INTAKE_FROM_EMAIL || "State of Ashes <onboarding@resend.dev>",
      to: [to],
      reply_to: entry.email,
      subject: `Diagnostic request — ${entry.name}`,
      text: `Name / Organization: ${entry.name}\nCommunication Channel: ${entry.email}\nSubmitted: ${entry.submittedAt}\n\nBottleneck:\n${entry.bottleneck}`,
      html: `<h2>Diagnostic request</h2><p><strong>Name / Organization:</strong> ${escape(entry.name)}<br><strong>Communication Channel:</strong> <a href="mailto:${escape(entry.email)}">${escape(entry.email)}</a><br><strong>Submitted:</strong> ${escape(entry.submittedAt)}</p><h3>Bottleneck</h3><p style="white-space:pre-wrap">${escape(entry.bottleneck)}</p>`,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Resend send failed: ${response.status} ${await response.text()}`);
  return true;
}

export async function POST(request: Request) {
  if (request.headers.get("origin") && new URL(request.headers.get("origin")!).host !== request.headers.get("host")) return NextResponse.json({ error: "Please submit the form from this website." }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 12000) return NextResponse.json({ error: "Please shorten your request and try again." }, { status: 413 });
  let data;
  try { data = JSON.parse(raw); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!data || typeof data !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const { name, email, bottleneck, website } = data;
  if (website) return NextResponse.json({ error: "Request could not be accepted." }, { status: 400 });
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 160 || typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof bottleneck !== "string" || bottleneck.trim().length < 20 || bottleneck.length > 5000) return NextResponse.json({ error: "Enter your name, a valid email, and at least 20 characters describing the bottleneck." }, { status: 400 });

  const entry: Submission = { name: name.trim(), email: email.trim(), bottleneck: bottleneck.trim(), submittedAt: new Date().toISOString() };

  let stored = false;
  try {
    stored = await store(entry);
  } catch (error) {
    console.error("intake: store failed", error);
  }

  let notified = false;
  try {
    notified = await notify(entry);
  } catch (error) {
    console.error("intake: notify failed", error);
  }

  // Saved or emailed is enough to consider the request received; only a total
  // failure is reported back to the visitor so they can keep their brief.
  if (!stored && !notified) return NextResponse.json({ error: "Delivery could not be confirmed. Your details have not been saved. Please try again later." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
