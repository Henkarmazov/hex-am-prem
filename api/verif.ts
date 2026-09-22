import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract email and link from query params or request body
  const emailParam = req.query?.email || req.body?.email;
  const linkParam = req.query?.link || req.body?.link;

  const email = typeof emailParam === 'string' ? emailParam.trim() : '';
  const link = typeof linkParam === 'string' ? linkParam.trim() : '';

  if (!email || !link) {
    return res.status(400).json({
      status: false,
      message: 'Parameter email dan link aktivasi wajib diisi.',
    });
  }

  const upstreamBase = process.env.UPSTREAM_API_URL || 'https://amvercel.vercel.app';
  const targetUrl = `${upstreamBase.replace(/\/+$/, '')}/api/verif?email=${encodeURIComponent(email)}&link=${encodeURIComponent(link)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const upstreamHeaders: Record<string, string> = {
      'Accept': 'application/json',
      'User-Agent': 'AM-Vercel-Serverless/1.0',
    };

    if (process.env.API_SECRET_KEY) {
      upstreamHeaders['Authorization'] = `Bearer ${process.env.API_SECRET_KEY}`;
    }

    const upstreamResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: upstreamHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await upstreamResponse.json();
    return res.status(upstreamResponse.status).json(data);
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      return res.status(504).json({
        status: false,
        message: 'Permintaan waktu habis (timeout). Proses aktivasi mungkin membutuhkan waktu lebih lama, silakan coba lagi.',
        email,
      });
    }

    return res.status(500).json({
      status: false,
      message: error.message || 'Terjadi kesalahan pada server saat verifikasi aktivasi.',
      email,
    });
  }
}
