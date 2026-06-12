type PseudoUploadZoneProps = {
  uploaded: boolean;
  onUpload: () => void;
};

export function PseudoUploadZone({ uploaded, onUpload }: PseudoUploadZoneProps) {
  return (
    <div className="rounded-3xl border border-sky-100 bg-sky-50/60 p-4 shadow-inner shadow-white/70">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-action">
            Upload Screenshot
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Fake upload only. No file picker opens.
          </p>
        </div>

        <button
          type="button"
          onClick={onUpload}
          className={[
            "inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-bold shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
            uploaded
              ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white"
              : "bg-gradient-to-r from-action via-sky-500 to-violet-500 text-white"
          ].join(" ")}
        >
          {uploaded ? "Screenshot added locally" : "Upload Screenshot"}
        </button>
      </div>
    </div>
  );
}
