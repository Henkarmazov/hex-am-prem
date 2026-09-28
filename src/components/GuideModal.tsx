import React, { useState } from 'react';
import { X, Eye, AlertTriangle, ArrowDown, ZoomIn } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="relative w-full max-w-lg sm:max-w-xl bg-white border border-slate-100 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white/80 sticky top-0 z-20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">Panduan Aktivasi</h3>
                <p className="text-[11px] text-slate-400">Ikuti langkah-langkah bergambar berikut</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Tutup panduan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            
            {/* STEP 1 */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    1
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm">Langkah 1: Masukkan Email & Kirim Link</h4>
                </div>
                <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  Tahap 1
                </span>
              </div>

              <p className="text-xs text-slate-600 pl-8">
                Masukkan alamat email yang belum pernah didaftarkan ke Alight Motion, lalu klik tombol <strong className="text-slate-800">"Aktivitasi Sekarang"</strong>.
              </p>

              {/* 16:9 Image for Step 1 */}
              <div 
                onClick={() => setPreviewImage({ url: 'https://i.ibb.co/TxRgdYk0/308655.jpg', title: 'Langkah 1: Masukkan Email' })}
                className="group relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs cursor-pointer"
              >
                <img
                  src="https://i.ibb.co/TxRgdYk0/308655.jpg"
                  alt="Panduan Langkah 1"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" /> Perbesar
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    2
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm">Langkah 2: Salin Link Aktivasi dari Email</h4>
                </div>
                <span className="text-[10px] font-semibold text-red-700 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  Penting
                </span>
              </div>

              <p className="text-xs text-slate-600 pl-8">
                Buka pesan dari <strong className="text-slate-800">Alight Creative</strong> di inbox atau folder spam email Anda.
              </p>

              {/* Step 2 - Image 1 */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Buka email → Salin URL link aktivasi.
                </span>
                <div 
                  onClick={() => setPreviewImage({ url: 'https://i.ibb.co/BMPvcPQ/308666.jpg', title: 'Langkah 2.1: Buka Email Alight Creative' })}
                  className="group relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs cursor-pointer"
                >
                  <img
                    src="https://i.ibb.co/BMPvcPQ/308666.jpg"
                    alt="Panduan Langkah 2 - Buka Email"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" /> Perbesar
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning Callout (Red Accent) */}
              <div className="p-3.5 rounded-xl bg-red-50/95 border border-red-200/90 text-red-700 text-xs flex gap-2.5 shadow-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <div>
                  <p className="font-bold text-red-700 tracking-tight">PERINGATAN PENTING:</p>
                  <p className="mt-0.5 leading-relaxed text-red-600">
                    <strong className="text-red-700 font-bold">Jangan langsung diklik!</strong> Tekan dan tahan (hold) tombol/link pada pesan email, lalu pilih <strong className="text-red-700 font-bold">"Salin URL"</strong> atau <strong className="text-red-700 font-bold">"Copy Link Address"</strong>.
                  </p>
                </div>
              </div>

              {/* Direction Indicator (Placed below Warning Callout) */}
              <div className="flex items-center justify-center py-0.5 text-slate-400">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 text-[11px] font-medium text-slate-600 border border-slate-200/60">
                  <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                  <span>Tahan tautan / link aktivasi</span>
                </div>
              </div>

              {/* Step 2 - Image 2 */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Tempel link → klik “Aktivasi Sekarang”.
                </span>
                <div 
                  onClick={() => setPreviewImage({ url: 'https://i.ibb.co/XfCR3Vnw/308658.jpg', title: 'Langkah 2.2: Tahan dan Salin URL' })}
                  className="group relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs cursor-pointer"
                >
                  <img
                    src="https://i.ibb.co/XfCR3Vnw/308658.jpg"
                    alt="Panduan Langkah 2 - Salin Link URL"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" /> Perbesar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 / SELESAI */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    3
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm">Langkah 3 / Selesai: Verifikasi Lisensi</h4>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Sukses
                </span>
              </div>

              <p className="text-xs text-slate-600 pl-8">
                Aktivasi berhasil! Silakan login ke akun Alight Motion Anda. Masa aktif 1 Tahun (365 hari) sudah aktif.
              </p>

              {/* Step 3 - Image */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Selesai.
                </span>
                <div 
                  onClick={() => setPreviewImage({ url: 'https://i.ibb.co/YTJV0v2F/308659.png', title: 'Langkah 3: Lisensi Berhasil Aktif' })}
                  className="group relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs cursor-pointer"
                >
                  <img
                    src="https://i.ibb.co/YTJV0v2F/308659.png"
                    alt="Panduan Langkah 3 / Selesai"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" /> Perbesar
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Klik gambar untuk melihat lebih jelas
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-xs font-semibold text-white transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Zooming In */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-200">{previewImage.title}</span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center aspect-video w-full bg-slate-950">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
