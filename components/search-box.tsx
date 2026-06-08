type SearchBoxProps = {
  placeholder?: string;
  initialQuery?: string;
  buttonLabel?: string;
  compact?: boolean;
  className?: string;
};

export function SearchBox({
  placeholder = "Search game or level",
  initialQuery = "",
  buttonLabel = "Search",
  compact = false,
  className = ""
}: SearchBoxProps) {
  return (
    <form
      action="/search"
      className={`flex w-full items-center gap-2 rounded-full border border-white/70 bg-white/90 p-1.5 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-within:border-action/40 focus-within:ring-4 focus-within:ring-action/15 ${
        compact ? "flex-row" : "flex-col sm:flex-row"
      } ${className}`}
    >
      <input
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder={placeholder}
        className={`min-w-0 flex-1 rounded-full bg-transparent px-5 text-ink outline-none placeholder:text-muted ${
          compact ? "h-10 text-sm" : "h-12 text-sm sm:h-14 sm:text-base"
        } ${compact ? "" : "w-full"}`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full bg-gradient-to-r from-action via-sky-500 to-indigo-500 font-bold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 ${
          compact
            ? "h-10 px-4 text-sm"
            : "h-12 w-full px-5 text-base sm:h-14 sm:w-auto sm:px-6"
        }`}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
