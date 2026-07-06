type MoonLogoProps = {
  className?: string;
  size?: number;
};

/** Minimal waxing-crescent mark — use text-memorial-gold for brand color. */
export function MoonLogo({ className, size = 20 }: MoonLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 2.75a7 7 0 0 0 9.85 9.85A9.25 9.25 0 1 1 12 2.75z"
        fill="currentColor"
      />
    </svg>
  );
}
