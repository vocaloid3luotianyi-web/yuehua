import Link from "next/link";
import Image from "next/image";
import { MemorialAtmosphere } from "@/components/MemorialAtmosphere";
import type { getHeroContent } from "@/lib/article";
import { getAdjacentPages } from "@/lib/site-pages";

type HeroSectionProps = ReturnType<typeof getHeroContent>;

export function HeroSection({ lastWords, narrative, name, dates }: HeroSectionProps) {
  const { next } = getAdjacentPages("/");
  const lastWordLines = lastWords.split("\n").filter(Boolean);

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <MemorialAtmosphere variant="hero" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-16 text-center md:pt-24">
        <div className="animate-fade-up mb-10">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full ring-1 ring-memorial-warm/30 ring-offset-4 ring-offset-memorial-bg md:h-44 md:w-44">
            <Image
              src="/images/portrait.jpg"
              alt={`${name}纪念肖像`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="animate-fade-up animation-delay-100 mb-3 font-serif text-2xl tracking-[0.35em] text-memorial-ink md:text-3xl">
          {name}
        </div>
        <p className="animate-fade-up animation-delay-150 mb-14 font-serif text-sm tracking-[0.3em] text-memorial-muted">
          {dates}
        </p>

        {lastWordLines.length > 0 && (
          <blockquote className="animate-fade-up animation-delay-200 mb-12 max-w-md">
            <p className="font-serif text-xl italic leading-[2] text-memorial-ink md:text-2xl">
              {lastWordLines.map((line, index) => (
                <span key={line}>
                  {index === 0 && "「"}
                  {line}
                  {index < lastWordLines.length - 1 ? (
                    <br />
                  ) : (
                    "」"
                  )}
                </span>
              ))}
            </p>
          </blockquote>
        )}

        {narrative.length > 0 && (
          <div className="animate-fade-up animation-delay-300 mb-14 max-w-lg space-y-4">
            {narrative.map((line) => (
              <p
                key={line}
                className="font-serif text-base leading-loose text-memorial-ink/75 md:text-[1.05rem]"
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {next ? (
          <Link
            href={next.href}
            className="animate-fade-up animation-delay-400 group inline-flex items-center gap-3 rounded-full bg-memorial-ink px-8 py-3.5 font-serif text-sm tracking-widest text-memorial-bg shadow-lg shadow-memorial-ink/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-memorial-ink/15"
          >
            顺着月光读下去
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
