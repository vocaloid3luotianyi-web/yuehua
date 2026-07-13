import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { memorialLinkClassName } from "@/lib/link-styles";

export type MarkdownProseVariant = "default" | "story";

function createComponents(variant: MarkdownProseVariant) {
  const blockquoteClassName =
    variant === "story"
      ? "my-8 border-l-2 border-memorial-warm/60 pl-6 font-kai text-[1.08rem] leading-[2] text-memorial-muted"
      : "my-8 border-l-2 border-memorial-warm/60 pl-6 italic text-memorial-muted";

  return {
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-5 leading-[1.9] text-memorial-ink/90">{children}</p>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className={blockquoteClassName}>
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-memorial-ink/90">{children}</ul>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-medium text-memorial-ink">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="text-memorial-muted">{children}</em>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => {
    const isInternal = href?.startsWith("/");
    return (
      <a
        href={href}
        {...(isInternal
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
        className={memorialLinkClassName}
      >
        {children}
      </a>
    );
  },
  hr: () => (
    <hr className="my-16 border-0 border-t border-memorial-border/50" aria-hidden />
  ),
};
}

export function MarkdownProse({
  content,
  variant = "default",
}: {
  content: string;
  variant?: MarkdownProseVariant;
}) {
  return (
    <div className="prose-memorial text-[1.05rem]">
      <ReactMarkdown components={createComponents(variant)}>{content}</ReactMarkdown>
    </div>
  );
}
