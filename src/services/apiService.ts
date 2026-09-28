import { SendResponse, VerifResponse } from '../types';

/**
 * Mengirim permintaan link aktivasi ke email via Vercel Serverless API (/api/send)
 */
export async function sendActivationEmail(email: string): Promise<SendResponse> {
  const cleanEmail = email.trim();
  const url = `/api/send?email=${encodeURIComponent(cleanEmail)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (!response.ok && json.status === undefined) {
      return {
        status: false,
        message: json.message || `Gagal menghubungi server (${response.status})`,
        email: cleanEmail,
      };
    }

    return json;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Permintaan waktu habis (timeout). Silakan periksa koneksi internet Anda dan coba lagi.');
    }
    throw new Error(error.message || 'Terjadi kesalahan jaringan saat mengirim link.');
  }
}

/**
 * Memverifikasi email dan auth link untuk aktivasi premium via Vercel Serverless API (/api/verif)
 */
export async function verifyActivationLink(email: string, link: string): Promise<VerifResponse> {
  const cleanEmail = email.trim();
  const cleanLink = link.trim();
  const url = `/api/verif?email=${encodeURIComponent(cleanEmail)}&link=${encodeURIComponent(cleanLink)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s timeout

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (!response.ok && json.status === undefined) {
      return {
        status: false,
        message: json.message || `Gagal verifikasi (${response.status})`,
        email: cleanEmail,
      };
    }

    return json;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Permintaan waktu habis (timeout). Proses aktivasi mungkin sedang lambat, silakan coba lagi.');
    }
    throw new Error(error.message || 'Terjadi kesalahan jaringan saat verifikasi akun.');
  }
}

/**
 * Format timestamp milidetik ke format tanggal Indonesia yang rapi
 */
export function formatTimestamp(ms?: number | string | null): string {
  if (!ms) return '-';
  const num = typeof ms === 'string' ? parseInt(ms, 10) : ms;
  if (isNaN(num)) return String(ms);

  // If timestamp is in seconds (10 digits) instead of ms (13 digits)
  const dateMs = num < 10000000000 ? num * 1000 : num;

  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }).format(new Date(dateMs));
  } catch {
    return new Date(dateMs).toLocaleString();
  }
}
