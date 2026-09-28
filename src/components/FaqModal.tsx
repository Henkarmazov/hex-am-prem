import React, { useState } from 'react';
import { X, FileText, ChevronDown } from 'lucide-react';

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
      a: 'Aktivasi lisensi resmi 1 tahun membutuhkan akun baru yang belum memiliki histori akun di Alight Creative agar lisensi premium dapat disematkan tanpa bentrok dengan data lama.',
    },
    {
      q: 'Mengapa tidak boleh langsung klik link di email?',
      a: 'Jika link diklik langsung di smartphone, aplikasi Alight Motion akan otomatis terbuka sebelum server menyelesaikan proses verifikasi lisensi 1 tahun. Anda cukup menyalin link tersebut dan menempelkannya di halaman verifikasi Hex-AM.',
    },
    {
      q: 'Apakah bebas watermark dan efek premium terbuka semua?',
      a: 'Ya, 100% full version resmi. Semua preset, efek animasi, layer tak terbatas, dan ekspor tanpa watermark dapat Anda nikmati.',
    },
    {
      q: 'Berapa lama masa aktif lisensi?',
      a: 'Aktif selama 365 hari penuh (1 tahun) terhitung sejak proses aktivasi berhasil diselesaikan.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Frequently Asked Questions</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-2.5 text-xs text-slate-600">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-3.5 text-left font-medium text-slate-800 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-2 transition-colors cursor-pointer"
              >
                <span>{f.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === i && (
                <div className="p-3.5 bg-white text-slate-600 leading-relaxed border-t border-slate-100 text-xs font-normal">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
