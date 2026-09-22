import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Mengapa email wajib yang belum pernah terdaftar?',
      a: 'Aktivasi lisensi resmi 1 tahun membutuhkan akun baru yang belum memiliki histori akun di Alight Creative agar tidak bentrok dengan data lama.',
    },
    {
      q: 'Mengapa tidak boleh langsung klik link di email?',
      a: 'Jika diklik langsung di HP, sistem akan otomatis membuka aplikasi Alight Motion biasa sebelum server berhasil menginjeksi lisensi premium 1 tahun. Anda harus salin linknya lalu tempel di halaman verif.',
    },
    {
      q: 'Apakah benar tanpa watermark dan semua efek terbuka?',
      a: 'Ya, 100% full version. Semua preset, transisi, dan ekspor tanpa tanda air.',
    },
    {
      q: 'Berapa lama masa aktifnya?',
      a: 'Aktif 365 hari penuh (1 tahun) terhitung sejak tanggal aktivasi.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-900 text-sm">FAQ</h3>
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
        <div className="p-4 overflow-y-auto space-y-2 text-xs text-slate-600">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-100 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-3 text-left font-medium text-slate-800 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between gap-2"
              >
                <span>{f.q}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === i && (
                <div className="p-3 bg-white text-slate-600 leading-relaxed border-t border-slate-100">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-white transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
