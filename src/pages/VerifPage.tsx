import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowRight, Shield, Zap, Lock, Star, ClipboardPaste, X, ArrowLeft, CheckCircle2, Copy, Check } from 'lucide-react';
import { verifyActivationLink } from '../services/apiService';
import { VerifResponse } from '../types';
import { AlightMotionLogo } from '../components/AlightMotionLogo';

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
    <div className="w-full max-w-md mx-auto">
      {/* Centered UI Card with soft shadows & glass elevation */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(8,112,184,0.08),0_4px_12px_rgba(0,0,0,0.03)] space-y-6">

        {/* Top: Alight Motion Logo centered above main title */}
        <div className="flex flex-col items-center text-center space-y-3.5">
          <AlightMotionLogo size={84} />
          
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
              Aktivasi <span className="text-blue-600">Alight Motion</span>
            </h1>
            <p className="text-xs sm:text-sm font-light text-slate-500 max-w-xs mx-auto leading-relaxed">
              {!result
                ? 'Masukkan link dari email kamu untuk menyelesaikan proses aktivasi.'
                : 'Aktivasi lisensi akun Anda telah berhasil diproses.'}
            </p>
          </div>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="verif-email" className="text-sm font-medium text-slate-700">
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
                  className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 transition-all disabled:opacity-50 pr-10"
                />
                {email && !loading && (
                  <button
                    type="button"
                    onClick={() => setEmail('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Link Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="verif-link" className="text-sm font-medium text-slate-700">
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
                  placeholder="https://alightcreative.com/..."
                  required
                  autoFocus
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 transition-all disabled:opacity-50 resize-none pr-9"
                />
                {link && !loading && (
                  <button
                    type="button"
                    onClick={() => setLink('')}
                    className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Tips: Buka inbox/spam email, tekan & tahan tombol lalu pilih <strong>"Salin URL"</strong>.
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs rounded-xl bg-red-50 border border-red-200 text-red-700 leading-relaxed">
                {error}
              </div>
            )}

            {/* Aktivasi Sekarang button */}
            <button
              type="submit"
              disabled={loading || !email.trim() || !link.trim()}
              className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memverifikasi Akun...</span>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Aktivasi Sekarang</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>

            {/* Back link */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => navigate('/send')}
                className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke kirim link</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5 pt-2">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Aktivasi Berhasil!
              </h2>
              <p className="text-xs text-slate-500">
                Akun <strong className="text-slate-800">{result.email || email}</strong> sudah aktif 1 tahun full.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between items-center">
                <span>Status Lisensi:</span>
                <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  Aktif (365 Hari)
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span>Code Order:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-slate-800 bg-white px-2.5 py-1 rounded-md border border-slate-200 text-xs">
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
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer bg-white border border-slate-200"
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
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Aktivasi Akun Lain
            </button>
          </div>
        )}

        {/* Bottom Trust Indicators (4 items) */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-4 gap-2 text-center">
          {/* Bottom Left: Shield */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-50/80 flex items-center justify-center mb-1.5 text-blue-600">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-slate-700 leading-tight">
              Aman & Terpercaya
            </span>
          </div>

          {/* Bottom Center-Left: Lightning Bolt */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-50/80 flex items-center justify-center mb-1.5 text-blue-600">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-slate-700 leading-tight">
              Proses Cepat
            </span>
          </div>

          {/* Bottom Center-Right: Lock */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-50/80 flex items-center justify-center mb-1.5 text-blue-600">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-slate-700 leading-tight">
              Data Email Dilindungi
            </span>
          </div>

          {/* Bottom Right: Star */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-50/80 flex items-center justify-center mb-1.5 text-blue-600">
              <Star className="w-4 h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-slate-700 leading-tight">
              100% Resmi
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
