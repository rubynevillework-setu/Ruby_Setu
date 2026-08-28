import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.02em]">
        Nothing here.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-mute">
        The page you were looking for has moved or never existed.
      </p>
      <Link
        href="/"
        className="mt-7 inline-block text-sm text-ruby underline underline-offset-4"
      >
        Back to the beginning
      </Link>
    </div>
  );
}
