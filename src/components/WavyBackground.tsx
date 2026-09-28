import React from 'react';

export const WavyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Base Dot Grid Pattern with radial mask */}
      <div 
        className="absolute inset-0 bg-tech-dots opacity-70"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 40%, transparent 85%)',
        }}
      />

      {/* 2. Static Ambient Gradient Light Orbs for depth */}
      {/* Top Right Orb */}
      <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-300/35 via-sky-200/30 to-indigo-200/20 blur-3xl" />
      
      {/* Bottom Left Orb */}
      <div className="absolute -bottom-20 -left-20 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-sky-300/30 via-blue-200/25 to-cyan-200/20 blur-3xl" />
      
      {/* Center Subtle Glow directly behind the main card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full bg-blue-100/40 blur-3xl" />

      {/* 3. Layered Abstract Wavy SVG Graphics (Static) */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Top-Flowing Dynamic Waves */}
        <path
          d="M-80 120 C 240 20, 480 220, 840 110 C 1140 15, 1380 180, 1550 100 L 1550 0 L -80 0 Z"
          fill="url(#waveGrad1)"
        />

        {/* Primary Accent Wave Line (Top) */}
        <path
          d="M-80 120 C 240 20, 480 220, 840 110 C 1140 15, 1380 180, 1550 100"
          stroke="url(#lineGrad1)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Secondary Dashed Motion Wave Line */}
        <path
          d="M-50 160 C 280 60, 520 260, 880 150 C 1180 55, 1420 210, 1600 140"
          stroke="url(#lineGrad2)"
          strokeWidth="2"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />

        {/* Bottom Flowing Waves */}
        <path
          d="M-100 720 C 260 620, 560 840, 940 730 C 1240 640, 1380 790, 1600 700 L 1600 950 L -100 950 Z"
          fill="url(#waveGrad2)"
        />

        {/* Bottom Accent Wave Line */}
        <path
          d="M-100 720 C 260 620, 560 840, 940 730 C 1240 640, 1380 790, 1600 700"
          stroke="url(#lineGrad1)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Tertiary Ripple Curves */}
        <path
          d="M-50 780 C 310 680, 600 890, 980 790 C 1280 710, 1430 830, 1650 760"
          stroke="url(#lineGrad2)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
      </svg>

      {/* 4. Decorative Geometric Elements (Static Hexagons for Hex-AM branding) */}
      {/* Left Hexagon */}
      <div className="absolute top-[22%] left-[6%] w-16 h-16 opacity-30 text-blue-400">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <polygon
            points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
        </svg>
      </div>

      {/* Right Hexagon */}
      <div className="absolute bottom-[28%] right-[8%] w-20 h-20 opacity-25 text-sky-400">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <polygon
            points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* Small subtle cross accents */}
      <div className="absolute top-[38%] right-[14%] text-blue-300 opacity-40 font-mono text-sm select-none">
        +
      </div>
      <div className="absolute bottom-[35%] left-[12%] text-sky-300 opacity-40 font-mono text-sm select-none">
        +
      </div>
    </div>
  );
};
