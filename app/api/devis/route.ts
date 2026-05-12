import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EMAIL } from '@/lib/constants';

const rateLimit = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    rateLimit.set(ip, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  // Honeypot check
  const honeypot = formData.get('company');
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const file = formData.get('file') as File | null;

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Validate file if present
  if (file && file.size > 0) {
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Graceful degradation: log but return success
    console.warn('RESEND_API_KEY not set – email not sent');
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  try {
    const attachments: { filename: string; content: Buffer }[] = [];
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(bytes),
      });
    }

    await resend.emails.send({
      from: 'IDOWU MATÉRIAUX <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL ?? EMAIL],
      subject: `Nouveau devis de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;">
          <h2 style="color:#F59E0B;">Nouveau devis reçu</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f5f5f5;padding:12px;border-radius:6px;">${message.replace(/\n/g, '<br>')}</p>
          ${file && file.size > 0 ? '<p><em>Un fichier joint est inclus.</em></p>' : ''}
        </div>
      `,
      ...(attachments.length > 0 ? { attachments } : {}),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}
