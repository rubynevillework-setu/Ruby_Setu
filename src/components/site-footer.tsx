import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 text-sm text-mute sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg text-ink">
            Ruby <span className="text-ruby">Setu</span>
          </p>
          <p className="mt-2 leading-relaxed">
            A bridge between social enterprises in Nepal and the European
            companies and networks that want to work with them.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/enterprises" className="hover:text-ink">
            Enterprises
          </Link>
          <Link href="/stories" className="hover:text-ink">
            Stories
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <Link href="/about#verification" className="hover:text-ink">
            How we verify
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
          Kathmandu · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
