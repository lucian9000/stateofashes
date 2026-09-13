import { NextResponse } from "next/server";
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
  const endpoint = process.env.INTAKE_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ error: "Intake is not connected yet. Your details have not been sent. Please try again once the channel is available." }, { status: 503 });
  try {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.INTAKE_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.INTAKE_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ name: name.trim(), email: email.trim(), bottleneck: bottleneck.trim(), source: "state-of-ashes", submittedAt: new Date().toISOString() }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Delivery failed");
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Delivery could not be confirmed. Please try again later." }, { status: 502 }); }
}
