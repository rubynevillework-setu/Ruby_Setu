import Link from "next/link";

const nav = [
  { href: "/enterprises", label: "Enterprises" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="group flex items-baseline gap-[0.3rem]">
          <span className="font-display text-2xl font-medium tracking-[-0.02em]">
            Ruby
          </span>
          <span className="font-display text-2xl font-medium tracking-[-0.02em] text-ruby">
            Setu
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-mute transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
