import React from 'react';

interface AlightMotionLogoProps {
  className?: string;
  size?: number;
}

export const AlightMotionLogo: React.FC<AlightMotionLogoProps> = ({ className = '', size = 84 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center group ${className}`}>
      {/* Outer ambient glow */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 blur-xl opacity-40 group-hover:opacity-65 transition-opacity duration-300" 
        style={{ width: size, height: size }}
      />

      {/* Main Logo Container with preserved rounded-2xl border radius */}
      <div
        className="relative inline-flex items-center justify-center shrink-0 rounded-2xl shadow-xl shadow-blue-500/25 overflow-hidden bg-white border border-slate-100/90 transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <img
          src="https://i.ibb.co/HTNYNNGc/308632.jpg"
          alt="Alight Motion"
          className="w-full h-full object-cover rounded-2xl"
          loading="eager"
        />
      </div>
    </div>
  );
};
