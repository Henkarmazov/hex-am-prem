import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Hexagon, HelpCircle, FileText, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenFaq: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuide, onOpenFaq }) => {
  return (
    <header className="w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xs">
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand Hex-AM */}
        <NavLink to="/send" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Hexagon className="w-4 h-4 fill-white stroke-none" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            Hex-AM
          </span>
        </NavLink>

        {/* Action Buttons: Clean & Compact */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenGuide}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Panduan</span>
          </button>

          <button
            type="button"
            onClick={onOpenFaq}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>FAQ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
