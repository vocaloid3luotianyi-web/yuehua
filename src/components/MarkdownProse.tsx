import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

const components = {
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-5 leading-[1.9] text-memorial-ink/90">{children}</p>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-8 border-l-2 border-memorial-warm/60 pl-6 italic text-memorial-muted">
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
  hr: () => (
    <hr className="my-16 border-0 border-t border-memorial-border/50" aria-hidden />
  ),
};

export function MarkdownProse({ content }: { content: string }) {
  return (
    <div className="prose-memorial text-[1.05rem]">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
