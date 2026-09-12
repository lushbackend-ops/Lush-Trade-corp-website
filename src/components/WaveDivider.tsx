'use client';

import React from 'react';

interface WaveDividerProps {
  /** Target section background color that the wave flows into */
  color: string;
  /** Whether to place at the 'bottom' (default) or 'top' of the section */
  position?: 'bottom' | 'top';
  /** Flip horizontally to create organic visual variety across sections */
  flip?: boolean;
  /** Custom height class (default: 'h-10 sm:h-14 md:h-18 lg:h-20') */
  heightClass?: string;
  /** Optional extra className */
  className?: string;
}

export default function WaveDivider({
  color,
  position = 'bottom',
  flip = false,
  heightClass = 'h-10 sm:h-14 md:h-18 lg:h-20',
  className = '',
}: WaveDividerProps) {
  const isTop = position === 'top';

  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none select-none ${
        isTop ? '-top-[2px] rotate-180' : '-bottom-[2px]'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color }}
        className={`relative block w-full ${heightClass} ${flip ? 'scale-x-[-1]' : ''}`}
        preserveAspectRatio="none"
      >
        {/* Layer 1: Ambient soft background swell */}
        <path
          d="M0,28 C220,74 440,8 660,48 C880,88 1100,24 1320,64 Q1380,74 1440,68 L1440,125 L0,125 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        {/* Layer 2: Mid-swell ocean wave */}
        <path
          d="M0,52 C260,101 500,24 760,68 C1020,112 1220,34 1440,74 L1440,125 L0,125 Z"
          fill="currentColor"
          fillOpacity="0.55"
        />
        {/* Layer 3: Foam crest line with subtle gold sheen */}
        <path
          d="M0,78 C240,120 500,40 760,84 C1020,128 1240,54 1440,88"
          stroke="rgba(197, 155, 39, 0.45)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Layer 4: Solid foreground wave connecting directly into adjacent section background */}
        <path
          d="M0,80 C240,122 500,42 760,86 C1020,130 1240,56 1440,90 L1440,125 L0,125 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
