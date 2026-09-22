import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, AlertCircle, Check, ClipboardPaste, X } from 'lucide-react';
import { sendActivationEmail } from '../services/apiService';

export const SendPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem('active_email') || '';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    if (location.state && (location.state as any).unauthorized) {
      return 'Kirim link aktivasi terlebih dahulu sebelum masuk ke halaman verifikasi.';
    }
    return null;
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError('Masukkan alamat email.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Format email tidak valid.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await sendActivationEmail(cleanEmail);

      if (res.status) {
        sessionStorage.setItem('can_access_verif', 'true');
        sessionStorage.setItem('active_email', res.email || cleanEmail);
        navigate('/verif', { state: { justSent: true } });
      } else {
        setError(res.message || 'Gagal mengirim link aktivasi.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Tanpa Watermark',
    'Semua Efek Terbuka',
    'Durasi Full 1 Tahun',
    'Email Pribadi',
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      {/* Main Clean Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            Aktivasi Alight Motion
          </h1>
        </div>

        {/* Concise Warning: Email Must Never Be Registered */}
        <div className="px-3 py-2 rounded-lg bg-amber-50 border border-amber-200/70 text-[11px] text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            <strong>Wajib:</strong> Gunakan email yang <u>belum pernah terdaftar</u> di Alight Motion.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
                Alamat Email
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
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="nama@email.com"
                required
                autoFocus
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

          {error && (
            <div className="p-2.5 text-xs rounded-lg bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="relative overflow-hidden w-full h-10 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-all disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-95"
          >
            {loading ? (
              <div className="relative w-full h-full flex items-center justify-center gap-2.5">
                {/* Subtle Shimmer sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer pointer-events-none" />
                {/* Skeleton pulse placeholders */}
                <div className="w-3.5 h-3.5 rounded-full bg-white/40 animate-pulse shrink-0" />
                <div className="h-3.5 w-20 bg-white/40 rounded-sm animate-pulse" />
              </div>
            ) : (
              <>
                <span>Send</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Feature Highlights: Clean 2x2 grid */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
              </span>
              <span className="font-medium text-slate-700">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
