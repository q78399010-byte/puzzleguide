import Link from "next/link";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  actionLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  actionLabel = "View all"
}: SectionHeadingProps) {
  return (
    <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-action">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 bg-white/80 px-5 text-sm font-bold text-action shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-ocean hover:shadow-xl"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
