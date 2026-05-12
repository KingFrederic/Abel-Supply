export default function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-xl">
        <defs>
          <radialGradient id="ambientGlow" cx="50%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.4"/>
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Ambient glow behind house */}
        <ellipse cx="250" cy="280" rx="160" ry="60" fill="url(#ambientGlow)" filter="url(#blur)" />

        {/* Ground shadow */}
        <ellipse cx="250" cy="338" rx="120" ry="8" fill="#000" opacity="0.5"/>

        {/* Foundation */}
        <rect x="130" y="305" width="240" height="22" rx="3" fill="#1C1C1E"/>
        <rect x="125" y="318" width="250" height="6" rx="2" fill="#2A2A2E"/>

        {/* Side walls */}
        <rect x="148" y="210" width="204" height="98" fill="#1A1A1F"/>
        <rect x="148" y="210" width="4" height="98" fill="#252528"/>
        <rect x="348" y="210" width="4" height="98" fill="#111114"/>

        {/* Front wall texture lines */}
        {[230,250,270,290].map((y,i) => (
          <line key={i} x1="148" y1={y} x2="352" y2={y} stroke="#222227" strokeWidth="0.5"/>
        ))}

        {/* Roof */}
        <polygon points="120,212 250,138 380,212" fill="#1E1C18"/>
        <polygon points="125,212 250,142 375,212" fill="#2A2518"/>
        <polygon points="130,212 250,146 370,212" fill="#F59E0B" opacity="0.7"/>
        {/* Roof tiles suggestion */}
        {[160,175,190,205].map((x,i) => (
          <line key={i} x1={x} y1={212 - (x-130)*0.58} x2={x+15} y2={212-(x-130+15)*0.58} stroke="#D97706" strokeWidth="1" opacity="0.4"/>
        ))}
        {[265,280,295,310,325,340].map((x,i) => (
          <line key={i} x1={x} y1={212 - (370-x)*0.58} x2={x+15} y2={212-(370-x-15)*0.58} stroke="#D97706" strokeWidth="1" opacity="0.4"/>
        ))}

        {/* Window — amber glow */}
        <rect x="195" y="230" width="48" height="38" rx="2" fill="#0E0C08"/>
        <rect x="196" y="231" width="46" height="36" rx="1.5" fill="url(#windowGlow)" filter="url(#glow)" opacity="0.85"/>
        <line x1="219" y1="231" x2="219" y2="267" stroke="#7C5A0A" strokeWidth="1"/>
        <line x1="196" y1="249" x2="242" y2="249" stroke="#7C5A0A" strokeWidth="1"/>

        {/* Door */}
        <rect x="267" y="252" width="34" height="55" rx="2" fill="#0A0A0C"/>
        <rect x="268" y="253" width="32" height="53" rx="1.5" fill="#1A1208"/>
        <circle cx="295" cy="280" r="3" fill="#F59E0B" opacity="0.8"/>
        {/* Door panels */}
        <rect x="271" y="256" width="13" height="18" rx="1" fill="#0F0B05" opacity="0.8"/>
        <rect x="286" y="256" width="12" height="18" rx="1" fill="#0F0B05" opacity="0.8"/>

        {/* Left scaffolding */}
        <rect x="118" y="210" width="4" height="95" fill="#2A2A30"/>
        <rect x="104" y="210" width="4" height="95" fill="#222228"/>
        {[230,255,280,300].map((y,i)=>(
          <rect key={i} x="103" y={y} width="20" height="2.5" fill="#333339"/>
        ))}
        <rect x="103" y="208" width="20" height="4" rx="1" fill="#3A3A40"/>

        {/* Right scaffolding */}
        <rect x="378" y="210" width="4" height="95" fill="#2A2A30"/>
        <rect x="392" y="210" width="4" height="95" fill="#222228"/>
        {[230,255,280,300].map((y,i)=>(
          <rect key={i} x="377" y={y} width="20" height="2.5" fill="#333339"/>
        ))}
        <rect x="377" y="208" width="20" height="4" rx="1" fill="#3A3A40"/>

        {/* Construction equipment bottom */}
        <rect x="148" y="322" width="32" height="6" rx="1" fill="#222"/>
        <rect x="320" y="322" width="32" height="6" rx="1" fill="#222"/>

        {/* Orbiting materials — 6 items */}

        {/* Cement sack — top-left */}
        <g transform="translate(72,180) rotate(-15)">
          <rect x="-18" y="-12" width="36" height="24" rx="5" fill="#D4D0C8"/>
          <rect x="-18" y="-1" width="36" height="2" fill="#B8B4AC"/>
          <rect x="-12" y="-12" width="24" height="4" rx="2" fill="#C8C4BC"/>
          <text x="0" y="7" textAnchor="middle" fontSize="5" fill="#888" fontFamily="sans-serif" fontWeight="600">CIMENT</text>
        </g>

        {/* Copper pipes — top-right */}
        <g transform="translate(430,175) rotate(20)">
          {[[-6,0],[0,0],[6,0]].map(([x],i)=>(
            <rect key={i} x={x-3} y="-18" width="6" height="36" rx="3"
              fill={i===1?"#CD7F32":i===0?"#B87333":"#A0632A"}/>
          ))}
          <rect x="-9" y="-20" width="18" height="4" rx="1" fill="#8B4513" opacity="0.6"/>
          <rect x="-9" y="16" width="18" height="4" rx="1" fill="#8B4513" opacity="0.6"/>
        </g>

        {/* Bathtub — left-mid */}
        <g transform="translate(65,290)">
          <rect x="-22" y="-8" width="44" height="16" rx="8" fill="#F5F5F5"/>
          <rect x="-19" y="-6" width="38" height="12" rx="7" fill="#E8E8E8" opacity="0.6"/>
          <rect x="-22" y="6" width="44" height="4" rx="2" fill="#DCDCDC"/>
          <circle cx="14" cy="-6" r="2.5" fill="#C0C0C0"/>
          <circle cx="14" cy="-6" r="1" fill="#A0A0A0"/>
        </g>

        {/* Wooden door — right-mid */}
        <g transform="translate(435,285) rotate(5)">
          <rect x="-14" y="-22" width="28" height="44" rx="2" fill="#5D3A1A"/>
          <rect x="-11" y="-19" width="10" height="14" rx="1" fill="#4A2E15"/>
          <rect x="1" y="-19" width="10" height="14" rx="1" fill="#4A2E15"/>
          <rect x="-11" y="-2" width="10" height="14" rx="1" fill="#4A2E15"/>
          <rect x="1" y="-2" width="10" height="14" rx="1" fill="#4A2E15"/>
          <circle cx="9" cy="2" r="3" fill="#F59E0B" opacity="0.9"/>
        </g>

        {/* Electrical spool — bottom-left */}
        <g transform="translate(80,350)">
          <ellipse cx="0" cy="-8" rx="16" ry="5" fill="#2A2A2A"/>
          <rect x="-7" y="-8" width="14" height="16" fill="#FCD34D"/>
          <ellipse cx="0" cy="8" rx="16" ry="5" fill="#2A2A2A"/>
          <ellipse cx="0" cy="-8" rx="9" ry="3" fill="#333"/>
          <ellipse cx="0" cy="8" rx="9" ry="3" fill="#333"/>
        </g>

        {/* Tile stack — bottom-right */}
        <g transform="translate(422,345)">
          {[[-10,'#C2410C'],[-4,'#EA580C'],[2,'#DC2626']].map(([y,fill],i)=>(
            <rect key={i} x="-20" y={y as number} width="40" height="8" rx="1.5"
              fill={fill as string} opacity={0.9}/>
          ))}
        </g>

        {/* Orbit guide ellipse */}
        <ellipse cx="250" cy="270" rx="200" ry="105" fill="none"
          stroke="#F59E0B" strokeWidth="0.5" strokeDasharray="6 8" opacity="0.15"/>
        <ellipse cx="250" cy="270" rx="160" ry="84" fill="none"
          stroke="#F59E0B" strokeWidth="0.5" strokeDasharray="4 10" opacity="0.08"/>
      </svg>
    </div>
  );
}
