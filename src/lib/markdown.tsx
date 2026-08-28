import { Fragment, type ReactNode } from "react";

/**
 * Deliberately tiny markdown renderer.
 *
 * Profile and story bodies are written by us, not by users, so a full
 * markdown pipeline is a dependency we do not need yet. Supports
 * paragraphs, ## and ### headings, > blockquotes, - lists, **bold** and
 * *italic*. If bodies ever become user-editable, swap this for a real
 * parser with sanitisation.
 */

function inline(text: string, keyPrefix: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return tokens.map((token, i) => {
    const key = `${keyPrefix}-${i}`;
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={key}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={key}>{token.slice(1, -1)}</em>;
    }
    return <Fragment key={key}>{token}</Fragment>;
  });
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/);

  return (
    <div className="prose-setu">
      {blocks.map((block, i) => {
        const key = `b-${i}`;
        const trimmed = block.trim();

        if (trimmed.startsWith("### ")) {
          return <h3 key={key}>{inline(trimmed.slice(4), key)}</h3>;
        }
        if (trimmed.startsWith("## ")) {
          return <h2 key={key}>{inline(trimmed.slice(3), key)}</h2>;
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={key}>
              {inline(
                trimmed
                  .split("\n")
                  .map((l) => l.replace(/^>\s?/, ""))
                  .join(" "),
                key,
              )}
            </blockquote>
          );
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((l) => l.replace(/^-\s?/, ""));
          return (
            <ul key={key}>
              {items.map((item, j) => (
                <li key={`${key}-${j}`}>{inline(item, `${key}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        return <p key={key}>{inline(trimmed.replace(/\n/g, " "), key)}</p>;
      })}
    </div>
  );
}
