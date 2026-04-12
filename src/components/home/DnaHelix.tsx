export default function DnaHelix() {
  const pairs = 14;

  return (
    <div className="dna-container" aria-hidden="true">
      <svg viewBox="0 0 200 600" className="dna-helix" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: pairs }).map((_, i) => {
          const y = 20 + i * 40;
          const delay = i * 0.15;
          return (
            <g key={i} className="dna-pair" style={{ animationDelay: `${delay}s` }}>
              {/* Left strand */}
              <circle cx="60" cy={y} r="4" className="dna-dot-left" style={{ animationDelay: `${delay}s` }} />
              {/* Right strand */}
              <circle cx="140" cy={y} r="4" className="dna-dot-right" style={{ animationDelay: `${delay}s` }} />
              {/* Bridge */}
              <line x1="64" y1={y} x2="136" y2={y} className="dna-bridge" style={{ animationDelay: `${delay}s` }} />
              {/* Glow */}
              <circle cx="100" cy={y} r="2" className="dna-center" style={{ animationDelay: `${delay}s` }} />
            </g>
          );
        })}

        {/* Left backbone */}
        <path
          d="M60,20 Q30,60 60,100 Q90,140 60,180 Q30,220 60,260 Q90,300 60,340 Q30,380 60,420 Q90,460 60,500 Q30,540 60,580"
          className="dna-backbone-left"
        />
        {/* Right backbone */}
        <path
          d="M140,20 Q170,60 140,100 Q110,140 140,180 Q170,220 140,260 Q110,300 140,340 Q170,380 140,420 Q110,460 140,500 Q170,540 140,580"
          className="dna-backbone-right"
        />
      </svg>
    </div>
  );
}
