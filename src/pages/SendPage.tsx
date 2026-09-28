import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Send, ArrowRight, Shield, Zap, Lock, Star, ClipboardPaste, X, AlertCircle } from 'lucide-react';
import { sendActivationEmail } from '../services/apiService';
import { AlightMotionLogo } from '../components/AlightMotionLogo';

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

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Centered UI Card design with soft shadows & glass elevation */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(8,112,184,0.08),0_4px_12px_rgba(0,0,0,0.03)] space-y-6">
        
        {/* Top: Alight Motion Logo centered above main title */}
        <div className="flex flex-col items-center text-center space-y-3.5">
          <AlightMotionLogo size={84} />
          
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
              Aktivasi <span className="text-blue-600">Alight Motion</span>
            </h1>
            <p className="text-xs sm:text-sm font-light text-slate-500 max-w-xs mx-auto leading-relaxed">
              Masukkan email Alight Motion kamu untuk melanjutkan proses aktivasi.
            </p>
          </div>
        </div>

        {/* Informative notice */}
        <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span className="leading-snug">
            <strong>Penting:</strong> Pastikan email <u>belum pernah terdaftar</u> di Alight Motion agar lisensi dapat terpasang otomatis.
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
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
                className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 transition-all disabled:opacity-50 pr-10"
              />
              {email && !loading && (
                <button
                  type="button"
                  onClick={() => setEmail('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title="Hapus"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 text-xs rounded-xl bg-red-50 border border-red-200 text-red-700 leading-relaxed">
              {error}
            </div>
          )}

          {/* Aktivasi Sekarang button with paper airplane icon and right arrow */}
          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2 text-sm font-semibold">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memproses Pengiriman...</span>
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 shrink-0" />
                <span>Aktivasi Sekarang</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </>
            )}
          </button>
        </form>

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
