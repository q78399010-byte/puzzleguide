type ProfileCardProps = {
  title: string;
  subtitle: string;
  description: string;
};

export function ProfileCard({ title, subtitle, description }: ProfileCardProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_22rem),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.14),transparent_24rem)]" />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-action">
            Profile Center
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted sm:text-xl">
            {subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {description}
          </p>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-blue-500/10 backdrop-blur-xl">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-action via-sky-500 to-violet-500 text-4xl font-bold text-white shadow-2xl shadow-blue-500/25">
            S
          </div>
          <p className="mt-4 text-center text-sm font-semibold text-muted">
            Static Profile
          </p>
        </div>
      </div>
    </section>
  );
}
