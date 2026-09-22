import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowLeft, ClipboardPaste, X, Copy, Check } from 'lucide-react';
import { verifyActivationLink } from '../services/apiService';
import { VerifResponse } from '../types';

export const VerifPage: React.FC = () => {
  const navigate = useNavigate();

  const [authorized, setAuthorized] = useState<boolean>(() => {
    return sessionStorage.getItem('can_access_verif') === 'true';
  });

  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem('active_email') || '';
  });
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifResponse | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const isAllowed = sessionStorage.getItem('can_access_verif') === 'true';
    if (!isAllowed) {
      navigate('/send', { replace: true, state: { unauthorized: true } });
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  if (!authorized) {
    return null;
  }

  const handlePasteEmail = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setEmail(text.trim());
        if (error) setError(null);
      }
    } catch {
      // ignore
    }
  };

  const handlePasteLink = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setLink(text.trim());
        if (error) setError(null);
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanLink = link.trim();

    if (!cleanEmail) {
      setError('Masukkan alamat email.');
      return;
    }

    if (!cleanLink) {
      setError('Masukkan link dari email.');
      return;
    }

    if (!cleanLink.startsWith('http://') && !cleanLink.startsWith('https://')) {
      setError('Link harus diawali dengan https://');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await verifyActivationLink(cleanEmail, cleanLink);
      if (res.status) {
        setResult(res);
      } else {
        setError(res.message || 'Verifikasi gagal. Pastikan link belum pernah dipakai.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem('can_access_verif');
    sessionStorage.removeItem('active_email');
    navigate('/send', { replace: true });
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            Aktivasi Alight Motion
          </h1>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="verif-email" className="block text-xs font-semibold text-slate-700">
                  Email
                </label>
                <button
                  type="button"
                  onClick={handlePasteEmail}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>Tempel</span>
                </button>
              </div>
              <div className="relative">
                <input
                  id="verif-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="nama@email.com"
                  required
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all disabled:opacity-50 pr-9"
                />
                {email && (
                  <button
                    type="button"
                    onClick={() => setEmail('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title="Hapus teks"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="verif-link" className="block text-xs font-semibold text-slate-700">
                  Link dari Email
                </label>
                <button
                  type="button"
                  onClick={handlePasteLink}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>Tempel</span>
                </button>
              </div>
              <div className="relative">
                <textarea
                  id="verif-link"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                    if (error) setError(null);
                  }}
                  rows={3}
                  placeholder="https://..."
                  required
                  autoFocus
                  disabled={loading}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all disabled:opacity-50 resize-none"
                />
                {link && (
                  <button
                    type="button"
                    onClick={() => setLink('')}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              Tips: Tahan tombol/link di email lalu pilih <em>"Salin URL"</em>.
            </p>

            {error && (
              <div className="p-2.5 text-xs rounded-lg bg-red-50 border border-red-200 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim() || !link.trim()}
              className="relative overflow-hidden w-full h-10 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-all disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-95"
            >
              {loading ? (
                <div className="relative w-full h-full flex items-center justify-center gap-2.5">
                  {/* Subtle Shimmer sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer pointer-events-none" />
                  {/* Skeleton pulse placeholders */}
                  <div className="w-3.5 h-3.5 rounded-full bg-white/40 animate-pulse shrink-0" />
                  <div className="h-3.5 w-24 bg-white/40 rounded-sm animate-pulse" />
                </div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Aktivasi</span>
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => navigate('/send')}
                className="text-xs text-slate-400 hover:text-slate-700 inline-flex items-center gap-1 font-medium transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Kembali ke kirim link</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 pt-1">
            <div className="text-center space-y-1.5">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Aktivasi Berhasil!
              </h2>
              <p className="text-xs text-slate-500">
                Akun <strong className="text-slate-700">{result.email || email}</strong> sudah aktif 1 tahun full.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs text-slate-600">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span className="font-semibold text-emerald-600">Aktif (365 Hari)</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/70">
                <span>Code Order:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                    {result.codeorder || (result as any).order_code || (result as any).data?.codeorder || '-'}
                  </span>
                  {(result.codeorder || (result as any).order_code || (result as any).data?.codeorder) && (
                    <button
                      type="button"
                      onClick={() => {
                        const code = result.codeorder || (result as any).order_code || (result as any).data?.codeorder || '';
                        navigator.clipboard.writeText(code);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                      title="Salin Code Order"
                    >
                      {copiedCode ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Aktivasi Akun Lain
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
