export default function MoleculeGrid() {
  return (
    <div className="molecule-grid" aria-hidden="true">
      <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.04]">
        {/* Hexagonal molecular grid pattern */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => {
            const x = col * 70 + (row % 2 ? 35 : 0);
            const y = row * 50;
            return (
              <g key={`${row}-${col}`}>
                <circle cx={x} cy={y} r="2" fill="currentColor" />
                {col < 5 && <line x1={x} y1={y} x2={x + 70} y2={y} stroke="currentColor" strokeWidth="0.5" />}
                {row < 7 && <line x1={x} y1={y} x2={x + (row % 2 ? -35 : 35)} y2={y + 50} stroke="currentColor" strokeWidth="0.5" />}
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
}
