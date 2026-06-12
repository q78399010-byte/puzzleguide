const testimonials = [
  "Helped me understand tricky boards.",
  "Great preview for planning moves.",
  "Looking forward to AI-assisted tools."
];

export function SolverProTestimonials() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
        Testimonials
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Demo feedback
      </h3>

      <div className="mt-6 grid gap-3">
        {testimonials.map((quote) => (
          <figure
            key={quote}
            className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            <blockquote className="text-sm font-semibold leading-6 text-ink">
              &quot;{quote}&quot;
            </blockquote>
            <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Demo feedback
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
