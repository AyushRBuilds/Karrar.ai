import React from 'react'

export function LegalWatermark() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        {/* Scales of Justice */}
        <text x="150" y="150" fontSize="80" fontFamily="serif">⚖️</text>
        <text x="1000" y="200" fontSize="80" fontFamily="serif">⚖️</text>
        <text x="600" y="100" fontSize="80" fontFamily="serif">⚖️</text>
        
        {/* Documents */}
        <text x="100" y="400" fontSize="80" fontFamily="serif">📄</text>
        <text x="1050" y="450" fontSize="80" fontFamily="serif">📄</text>
        <text x="500" y="600" fontSize="80" fontFamily="serif">📄</text>
        
        {/* Columns */}
        <text x="250" y="650" fontSize="80" fontFamily="serif">🏛️</text>
        <text x="900" y="300" fontSize="80" fontFamily="serif">🏛️</text>
        
        {/* Gavel */}
        <text x="700" y="500" fontSize="80" fontFamily="serif">🔨</text>
        <text x="350" y="200" fontSize="80" fontFamily="serif">🔨</text>
        
        {/* Magnifier */}
        <text x="800" y="700" fontSize="80" fontFamily="serif">🔍</text>
        <text x="200" y="750" fontSize="80" fontFamily="serif">🔍</text>
      </svg>
      
      {/* Connection dots pattern */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <pattern id="dots" x="100" y="100" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="2" fill="#1c1a17" opacity="0.1" />
            <circle cx="100" cy="100" r="2" fill="#1c1a17" opacity="0.1" />
            <circle cx="200" cy="0" r="2" fill="#1c1a17" opacity="0.1" />
            <circle cx="0" cy="200" r="2" fill="#1c1a17" opacity="0.1" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="#1c1a17" strokeWidth="0.5" opacity="0.05" />
            <line x1="100" y1="100" x2="200" y2="0" stroke="#1c1a17" strokeWidth="0.5" opacity="0.05" />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#dots)" />
      </svg>
    </div>
  )
}
