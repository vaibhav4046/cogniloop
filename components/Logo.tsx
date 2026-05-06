interface Props {
  size?: number;
  className?: string;
}

export function Logo({ size = 22, className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="cl-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <path
          d="M21 6a10 10 0 1 0 4 8"
          stroke="url(#cl-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="22" cy="6" r="2.2" fill="#a78bfa" />
        <circle cx="16" cy="16" r="2.2" fill="#a78bfa" opacity="0.6" />
      </svg>
      <span className="font-semibold tracking-tight text-[15px]">Cogniloop</span>
    </span>
  );
}
