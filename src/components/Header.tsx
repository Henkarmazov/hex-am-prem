import React from 'react';
import { NavLink } from 'react-router-dom';
import { Eye, FileText } from 'lucide-react';
import { HexLogo } from './HexLogo';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenFaq: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuide, onOpenFaq }) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Top Left: Redesigned Hex-AM Logo with faceted blue hexagon emblem */}
        <NavLink
          to="/send"
          className="flex items-center gap-3 group transition-transform active:scale-[0.98] select-none"
        >
          {/* New 3D-Faceted Hexagon Emblem */}
          <HexLogo size={36} />

          {/* Typography Lockup */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors">
                Hex<span className="text-blue-600">-AM</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200/60 uppercase tracking-wider">
                Official
              </span>
            </div>
          </div>
        </NavLink>

        {/* Top Right: Panduan (eye icon) & FAQ (document icon) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100/70 rounded-xl transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
            <span>Panduan</span>
          </button>

          <button
            type="button"
            onClick={onOpenFaq}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100/70 rounded-xl transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
            <span>FAQ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
