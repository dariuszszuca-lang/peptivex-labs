export default function HexPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <path d="M28 66L0 50V16L28 0l28 16v34L28 66zm0 0l28 16v34L28 100 0 84V50l28 16z"
            fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}
