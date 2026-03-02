"use client";

export const WmScales = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="16" y1="4" x2="16" y2="28" />
    <line x1="8" y1="28" x2="24" y2="28" />
    <line x1="6" y1="10" x2="26" y2="10" />
    <polyline points="6,10 4,16 8,16 6,10" />
    <polyline points="26,10 24,16 28,16 26,10" />
    <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    <line x1="6" y1="10" x2="10" y2="7" />
    <line x1="26" y1="10" x2="22" y2="7" />
    <line x1="10" y1="7" x2="22" y2="7" />
  </svg>
);

export const WmQuill = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M26 4 C20 4 10 10 8 26" />
    <path d="M26 4 C28 10 22 18 8 26" />
    <path d="M14 20 L8 26 L10 20 Z" fill="currentColor" fillOpacity="0.4" />
    <line x1="8" y1="26" x2="14" y2="28" />
  </svg>
);

export const WmSeal = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="16" cy="16" r="10" />
    <circle cx="16" cy="16" r="6" />
    <line x1="16" y1="4" x2="16" y2="6" />
    <line x1="16" y1="26" x2="16" y2="28" />
    <line x1="4" y1="16" x2="6" y2="16" />
    <line x1="26" y1="16" x2="28" y2="16" />
    <path d="M14 14 L16 12 L18 14 L18 18 L14 18 Z" />
  </svg>
);

export const WmPillar = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="6" x2="26" y2="6" />
    <line x1="6" y1="28" x2="26" y2="28" />
    <line x1="4" y1="8" x2="28" y2="8" />
    <rect x="9" y="8" width="4" height="18" />
    <rect x="14" y="8" width="4" height="18" />
    <rect x="19" y="8" width="4" height="18" />
    <line x1="4" y1="26" x2="28" y2="26" />
  </svg>
);

export const LEGAL_ICONS = [
  { x: 4, y: 10, size: 52, rot: -15, Ic: WmScales },
  { x: 86, y: 7, size: 40, rot: 20, Ic: WmQuill },
  { x: 14, y: 70, size: 44, rot: -8, Ic: WmSeal },
  { x: 80, y: 62, size: 56, rot: 12, Ic: WmPillar },
  { x: 48, y: 4, size: 32, rot: 5, Ic: WmScales },
  { x: 91, y: 40, size: 42, rot: -20, Ic: WmQuill },
  { x: 2, y: 44, size: 36, rot: 10, Ic: WmSeal },
  { x: 58, y: 83, size: 48, rot: -5, Ic: WmPillar },
  { x: 28, y: 88, size: 30, rot: 18, Ic: WmScales },
  { x: 68, y: 18, size: 34, rot: -12, Ic: WmQuill },
  { x: 35, y: 52, size: 28, rot: 8, Ic: WmSeal },
  { x: 72, y: 38, size: 38, rot: -6, Ic: WmPillar },
];
