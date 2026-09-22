import React from 'react';
import { X, HelpCircle, AlertTriangle } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-900 text-sm">Panduan Aktivasi</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">1. Kirim Link</p>
            <p>
              Masukkan alamat email pada halaman 1. Pastikan email belum pernah terdaftar di aplikasi Alight Motion.
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-slate-800">2. Salin Link dari Email</p>
            <p>
              Buka email masuk dari <em>Alight Creative</em> (cek inbox/spam).
            </p>
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/70 text-amber-800 text-[11px] flex gap-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600 mt-0.5" />
              <span>
                <strong>Penting:</strong> Jangan langsung klik linknya jika di HP. Tahan link lalu pilih <strong>"Salin URL / Copy link"</strong>.
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-slate-800">3. Aktivasi</p>
            <p>
              Tempel link di halaman 2, lalu klik <strong>Aktivasi</strong>. Akun langsung aktif 1 tahun full.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-white transition-colors cursor-pointer"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
