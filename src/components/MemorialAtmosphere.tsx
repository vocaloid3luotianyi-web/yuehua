type MemorialAtmosphereProps = {
  variant?: "hero" | "subtle";
};

export function MemorialAtmosphere({ variant = "subtle" }: MemorialAtmosphereProps) {
  const isHero = variant === "hero";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={`absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full ${
          isHero
            ? "bg-[radial-gradient(circle,rgba(196,168,130,0.12)_0%,transparent_70%)]"
            : "bg-[radial-gradient(circle,rgba(196,168,130,0.06)_0%,transparent_70%)]"
        }`}
      />
      <div
        className={`absolute -right-1/4 bottom-0 h-[50vh] w-[50vh] rounded-full ${
          isHero
            ? "bg-[radial-gradient(circle,rgba(139,154,143,0.08)_0%,transparent_70%)]"
            : "bg-[radial-gradient(circle,rgba(139,154,143,0.04)_0%,transparent_70%)]"
        }`}
      />
    </div>
  );
}
