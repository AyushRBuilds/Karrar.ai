"use client";

export function KarrarLogo({ size = 28, wordmark = false }: { size?: number; wordmark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: wordmark ? 8 : 0 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minWidth: size, minHeight: size }}
      >
        {/* Shield-like frame */}
        <path
          d="M100 20L160 50V110C160 160 100 185 100 185C100 185 40 160 40 110V50L100 20Z"
          stroke="#C49E6C"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Gavel inside */}
        <g transform="translate(70, 60)">
          <rect x="15" y="5" width="30" height="12" rx="2" fill="#C49E6C" />
          <line x1="30" y1="17" x2="30" y2="45" stroke="#C49E6C" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 45L40 45" stroke="#C49E6C" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>

      {wordmark && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <div
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: size * 0.7,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Karrar
          </div>
          <div
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: size * 0.3,
              color: "#C49E6C",
              letterSpacing: "0.05em",
              marginTop: 2,
            }}
          >
            AI
          </div>
        </div>
      )}
    </div>
  );
}
