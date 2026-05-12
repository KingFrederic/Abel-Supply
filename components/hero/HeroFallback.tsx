export default function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 400 350"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-lg opacity-80"
      >
        {/* Foundation */}
        <rect x="120" y="260" width="160" height="18" rx="2" fill="#4B5563" />
        {/* Walls */}
        <rect x="130" y="185" width="140" height="78" fill="#C8C2B6" opacity="0.9" />
        {/* Window */}
        <rect x="180" y="205" width="40" height="32" rx="2" fill="#F59E0B" opacity="0.7" />
        {/* Door */}
        <rect x="170" y="228" width="24" height="35" rx="2" fill="#92400E" />
        {/* Roof */}
        <polygon points="110,188 200,130 290,188" fill="#D97706" />
        <polygon points="115,188 200,133 285,188" fill="#F59E0B" opacity="0.6" />
        {/* Scaffolding left */}
        <line x1="125" y1="185" x2="125" y2="260" stroke="#9CA3AF" strokeWidth="3" />
        <line x1="110" y1="185" x2="110" y2="260" stroke="#9CA3AF" strokeWidth="3" />
        <line x1="108" y1="210" x2="128" y2="210" stroke="#9CA3AF" strokeWidth="2" />
        <line x1="108" y1="235" x2="128" y2="235" stroke="#9CA3AF" strokeWidth="2" />
        {/* Scaffolding right */}
        <line x1="275" y1="185" x2="275" y2="260" stroke="#9CA3AF" strokeWidth="3" />
        <line x1="290" y1="185" x2="290" y2="260" stroke="#9CA3AF" strokeWidth="3" />
        <line x1="273" y1="210" x2="293" y2="210" stroke="#9CA3AF" strokeWidth="2" />
        <line x1="273" y1="235" x2="293" y2="235" stroke="#9CA3AF" strokeWidth="2" />

        {/* Orbiting materials — 6 items */}
        {/* Cement sack */}
        <g transform="translate(55, 155)">
          <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#E5E7EB" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="#D1D5DB" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fontSize="7" fill="#6B7280">ciment</text>
        </g>
        {/* Copper pipe */}
        <g transform="translate(345, 145)">
          <rect x="-5" y="-16" width="10" height="32" rx="5" fill="#B45309" />
          <rect x="-9" y="-16" width="10" height="32" rx="5" fill="#D97706" />
          <rect x="-13" y="-16" width="10" height="32" rx="5" fill="#92400E" />
        </g>
        {/* Bathtub */}
        <g transform="translate(60, 255)">
          <path d="M-18,5 Q-18,-10 18,-10 L18,5 Z" fill="white" opacity="0.9" />
          <rect x="-18" y="5" width="36" height="6" rx="3" fill="#E5E7EB" />
        </g>
        {/* Door */}
        <g transform="translate(340, 250)">
          <rect x="-12" y="-18" width="24" height="36" rx="2" fill="#92400E" />
          <circle cx="8" cy="0" r="3" fill="#D97706" />
        </g>
        {/* Electrical spool */}
        <g transform="translate(80, 320)">
          <ellipse cx="0" cy="-2" rx="14" ry="5" fill="#374151" />
          <rect x="-6" y="-6" width="12" height="8" fill="#4B5563" />
          <ellipse cx="0" cy="2" rx="14" ry="5" fill="#374151" />
        </g>
        {/* Tile stack */}
        <g transform="translate(320, 310)">
          <rect x="-14" y="-3" width="28" height="6" rx="1" fill="#C2410C" />
          <rect x="-14" y="-9" width="28" height="6" rx="1" fill="#EA580C" />
          <rect x="-14" y="-15" width="28" height="6" rx="1" fill="#DC2626" />
        </g>

        {/* Orbit ellipse guides */}
        <ellipse cx="200" cy="215" rx="155" ry="85" fill="none" stroke="#F59E0B" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.25" />
      </svg>
    </div>
  );
}
