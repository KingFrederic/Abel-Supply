import { type NextRequest, NextResponse } from 'next/server';

const ALLOWED = new Set([
  'images.unsplash.com',
  'source.unsplash.com',
  'drive.google.com',
  'lh3.googleusercontent.com',
]);

export async function GET(req: NextRequest) {
  const src = req.nextUrl.searchParams.get('src');
  if (!src) return new NextResponse('Missing src', { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(src);
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  if (!ALLOWED.has(parsed.hostname)) {
    return new NextResponse('Host not allowed', { status: 403 });
  }

  try {
    const upstream = await fetch(src, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!upstream.ok) {
      return new NextResponse(`Upstream: ${upstream.status}`, { status: upstream.status });
    }

    const buffer = await upstream.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': upstream.headers.get('content-type') ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (err) {
    console.error('[img-proxy]', err);
    return new NextResponse('Proxy error', { status: 502 });
  }
}
