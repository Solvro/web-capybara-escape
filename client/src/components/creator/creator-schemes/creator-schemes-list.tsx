import type { ScreenSequenceDto } from "@capybara/shared";

interface CreatorSchemesListProps {
  schemes: ScreenSequenceDto[];
  onDelete: (slug: string) => void;
}

export function CreatorSchemesList({
  schemes,
  onDelete,
}: CreatorSchemesListProps) {
  if (schemes.length === 0) {
    return <p className="text-sm text-violet-200">No schemes yet.</p>;
  }

  return (
    <ul className="flex w-full flex-col gap-2">
      {schemes.map((scheme) => (
        <li
          key={scheme.id}
          className="flex items-center gap-4 rounded-lg bg-[#4b2a86] p-4 text-left shadow-lg"
        >
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-bold text-amber-300"
              title={scheme.slug}
            >
              {scheme.slug}
            </p>
            <p className="truncate text-xs text-violet-200">
              {scheme.description ?? "No description"}
            </p>
          </div>
          <span className="text-xs whitespace-nowrap text-violet-200">
            {scheme.screens.length} screens
          </span>
          <button
            className="h-8 min-w-[70px] rounded-md bg-red-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-red-400"
            onClick={() => {
              onDelete(scheme.slug);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
