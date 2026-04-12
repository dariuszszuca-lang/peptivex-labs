export default function LabBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Stylized lab equipment silhouettes */}
      <svg className="absolute right-0 bottom-0 w-[600px] h-[500px] opacity-[0.03]" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flask */}
        <path d="M200 50 L200 200 L140 350 Q130 380 160 380 L240 380 Q270 380 260 350 L200 200" stroke="white" strokeWidth="2" />
        <ellipse cx="200" cy="50" rx="30" ry="8" stroke="white" strokeWidth="2" />
        {/* Bubbles in flask */}
        <circle cx="185" cy="300" r="8" stroke="white" strokeWidth="1" />
        <circle cx="210" cy="320" r="5" stroke="white" strokeWidth="1" />
        <circle cx="195" cy="340" r="6" stroke="white" strokeWidth="1" />
        {/* Test tube */}
        <path d="M350 100 L350 300 Q350 330 370 330 Q390 330 390 300 L390 100" stroke="white" strokeWidth="2" />
        <line x1="340" y1="100" x2="400" y2="100" stroke="white" strokeWidth="2" />
        {/* Beaker */}
        <path d="M450 180 L430 380 L550 380 L530 180 Z" stroke="white" strokeWidth="2" />
        <line x1="440" y1="180" x2="540" y2="180" stroke="white" strokeWidth="2" />
        {/* Measurement lines */}
        <line x1="440" y1="220" x2="460" y2="220" stroke="white" strokeWidth="1" />
        <line x1="438" y1="260" x2="460" y2="260" stroke="white" strokeWidth="1" />
        <line x1="436" y1="300" x2="460" y2="300" stroke="white" strokeWidth="1" />
        <line x1="434" y1="340" x2="460" y2="340" stroke="white" strokeWidth="1" />
        {/* Molecule */}
        <circle cx="100" cy="420" r="15" stroke="white" strokeWidth="1.5" />
        <circle cx="60" cy="380" r="10" stroke="white" strokeWidth="1.5" />
        <circle cx="140" cy="400" r="12" stroke="white" strokeWidth="1.5" />
        <line x1="88" y1="410" x2="68" y2="388" stroke="white" strokeWidth="1.5" />
        <line x1="112" y1="412" x2="130" y2="405" stroke="white" strokeWidth="1.5" />
      </svg>

      {/* Molecular structure top-left */}
      <svg className="absolute left-0 top-0 w-[400px] h-[300px] opacity-[0.025]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Peptide chain */}
        <circle cx="50" cy="150" r="12" stroke="white" strokeWidth="1.5" />
        <circle cx="110" cy="100" r="10" stroke="white" strokeWidth="1.5" />
        <circle cx="170" cy="140" r="14" stroke="white" strokeWidth="1.5" />
        <circle cx="230" cy="90" r="11" stroke="white" strokeWidth="1.5" />
        <circle cx="290" cy="130" r="13" stroke="white" strokeWidth="1.5" />
        <circle cx="350" cy="80" r="10" stroke="white" strokeWidth="1.5" />
        <line x1="60" y1="142" x2="102" y2="108" stroke="white" strokeWidth="1" />
        <line x1="118" y1="106" x2="160" y2="132" stroke="white" strokeWidth="1" />
        <line x1="180" y1="130" x2="222" y2="98" stroke="white" strokeWidth="1" />
        <line x1="238" y1="96" x2="280" y2="122" stroke="white" strokeWidth="1" />
        <line x1="300" y1="122" x2="342" y2="88" stroke="white" strokeWidth="1" />
        {/* Side chains */}
        <circle cx="50" cy="200" r="6" stroke="white" strokeWidth="1" />
        <line x1="50" y1="162" x2="50" y2="194" stroke="white" strokeWidth="1" />
        <circle cx="170" cy="190" r="7" stroke="white" strokeWidth="1" />
        <line x1="170" y1="154" x2="170" y2="183" stroke="white" strokeWidth="1" />
        <circle cx="290" cy="180" r="5" stroke="white" strokeWidth="1" />
        <line x1="290" y1="143" x2="290" y2="175" stroke="white" strokeWidth="1" />
      </svg>
    </div>
  );
}
