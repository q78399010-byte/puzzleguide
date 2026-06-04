type SearchBoxProps = {
  placeholder?: string;
  initialQuery?: string;
  buttonLabel?: string;
  compact?: boolean;
  className?: string;
};

export function SearchBox({
  placeholder = "Search games or levels",
  initialQuery = "",
  buttonLabel = "Search",
  compact = false,
  className = ""
}: SearchBoxProps) {
  return (
    <form
      action="/search"
      className={`flex w-full items-center rounded-full border border-line bg-white shadow-soft ${className}`}
    >
      <input
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder={placeholder}
        className={`min-w-0 flex-1 rounded-l-full bg-transparent px-5 text-ink outline-none placeholder:text-muted ${
          compact ? "h-10 text-sm" : "h-14 text-base"
        }`}
      />
      <button
        type="submit"
        className={`mr-1 rounded-full bg-action font-semibold text-white transition hover:bg-ocean ${
          compact ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
        }`}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
