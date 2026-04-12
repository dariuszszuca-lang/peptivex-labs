export default function DnaHelix() {
  return (
    <div className="hero-molecule" aria-hidden="true">
      {/* Central rotating molecule */}
      <div className="mol-core">
        {/* Orbiting rings */}
        <div className="mol-ring mol-ring-1" />
        <div className="mol-ring mol-ring-2" />
        <div className="mol-ring mol-ring-3" />

        {/* Center glow */}
        <div className="mol-center" />

        {/* Orbiting atoms */}
        <div className="mol-orbit mol-orbit-1">
          <div className="mol-atom mol-atom-amber" />
        </div>
        <div className="mol-orbit mol-orbit-2">
          <div className="mol-atom mol-atom-teal" />
        </div>
        <div className="mol-orbit mol-orbit-3">
          <div className="mol-atom mol-atom-white" />
        </div>

        {/* Floating data points */}
        <div className="mol-data mol-data-1">
          <span className="mol-label">HPLC</span>
          <span className="mol-value">&gt;98%</span>
        </div>
        <div className="mol-data mol-data-2">
          <span className="mol-label">MW</span>
          <span className="mol-value">1419 Da</span>
        </div>
        <div className="mol-data mol-data-3">
          <span className="mol-label">pH</span>
          <span className="mol-value">6.8</span>
        </div>
      </div>

      {/* Connecting lines radiating out */}
      <svg className="mol-connections" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="60" className="mol-circle-inner" />
        <circle cx="200" cy="200" r="120" className="mol-circle-mid" />
        <circle cx="200" cy="200" r="180" className="mol-circle-outer" />

        {/* Peptide chain suggestion */}
        <path d="M80,200 Q120,160 160,200 Q200,240 240,200 Q280,160 320,200" className="mol-peptide-path" />
        <path d="M80,220 Q120,260 160,220 Q200,180 240,220 Q280,260 320,220" className="mol-peptide-path mol-peptide-path-2" />

        {/* Nodes on chains */}
        {[80, 120, 160, 200, 240, 280, 320].map((x, i) => (
          <circle key={i} cx={x} cy={200 + (i % 2 ? -20 : 20) * Math.sin(i)} r={3 + (i % 3)} className="mol-node" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}

        {/* Floating measurement lines */}
        <line x1="50" y1="100" x2="90" y2="100" className="mol-measure" />
        <line x1="310" y1="300" x2="350" y2="300" className="mol-measure" style={{ animationDelay: '2s' }} />
      </svg>

      {/* Scanning line */}
      <div className="mol-scan" />
    </div>
  );
}
