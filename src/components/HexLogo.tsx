import React from 'react';

interface HexLogoProps {
  className?: string;
  size?: number;
}

export const HexLogo: React.FC<HexLogoProps> = ({ className = '', size = 34 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Soft ambient backlight glow */}
      <div className="absolute inset-0 rounded-xl bg-blue-500/25 blur-md group-hover:bg-blue-500/45 transition-all duration-300" />

      {/* Modern Faceted Hexagon Emblem with Motion Wave Core */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(37,99,235,0.25)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Top Facet Gradient */}
          <linearGradient id="hexTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Right Facet Gradient */}
          <linearGradient id="hexRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Left Facet Gradient */}
          <linearGradient id="hexLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>

          {/* Inner Motion Swirl Gradient */}
          <linearGradient id="hexCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>

        {/* 1. Outer Isometric Facets of the Hexagon */}
        {/* Top Facet */}
        <polygon
          points="50 5, 90 26, 50 49, 10 26"
          fill="url(#hexTop)"
        />
        {/* Right Facet */}
        <polygon
          points="90 26, 90 74, 50 95, 50 49"
          fill="url(#hexRight)"
        />
        {/* Left Facet */}
        <polygon
          points="10 26, 50 49, 50 95, 10 74"
          fill="url(#hexLeft)"
        />

        {/* 2. Sleek Inner Geometric Motion Lines representing "Hex" + "AM" */}
        <path
          d="M32 40 C 38 28, 62 28, 68 40 C 72 48, 66 58, 52 58 C 40 58, 36 68, 44 74 C 54 80, 68 74, 70 66"
          stroke="url(#hexCore)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-xs"
        />

        {/* Central luminous dot */}
        <circle cx="50" cy="49" r="3.5" fill="#ffffff" />

        {/* Hexagon Outer Border outline for sharp precision */}
        <polygon
          points="50 5, 90 26, 90 74, 50 95, 10 74, 10 26"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
