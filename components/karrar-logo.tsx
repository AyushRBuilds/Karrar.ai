"use client";

export function KarrarLogo({ size = 24, wordmark = false }: { size?: number; wordmark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: wordmark ? 10 : 0 }}>
      {/* Logo mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* K shape with modern legal theme */}
        <path
          d="M8 4 L8 28 M8 16 L24 4 M8 16 L24 28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Accent circle */}
        <circle cx="26" cy="6" r="2.5" fill="currentColor" opacity="0.6" />
      </svg>

      {/* Wordmark */}
      {wordmark && (
        <span
          style={{
            fontSize: size * 1.2,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: "Playfair Display, serif",
          }}
        >
          Karrar
        </span>
      )}
    </div>
  );
}
