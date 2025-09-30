import { memo } from "react";

export type SearchHistoryProps = {
  items: string[];
  isOpen: boolean;
  onSelect: (value: string) => void;
  onClear: () => void;
  onDelete: (value: string) => void;
};

function SearchHistory({ items, isOpen, onSelect, onClear, onDelete }: SearchHistoryProps) {
  if (items.length === 0) {
    return null;
  }

  const containerClass = `relative z-10 overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 ease-out sm:rounded-lg ${
    isOpen
      ? "border border-gray-200 p-4 opacity-100 translate-y-0 max-h-72"
      : "pointer-events-none border-transparent p-0 opacity-0 -translate-y-2 max-h-0"
  }`;

  return (
    <div className={containerClass}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-gray-700">최근 검색어</span>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-gray-400 transition-colors duration-150 hover:text-gray-600">
          전체삭제
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="w-full rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-700 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#03c75a] hover:text-[#03c75a] sm:w-auto sm:py-1.5">
              {item}
            </button>
            <button
              type="button"
              onClick={() => onDelete(item)}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              aria-label={`${item} 삭제`}
              className="h-7 w-7 shrink-0 rounded-full border border-gray-200 text-xs text-gray-400 transition-colors duration-150 hover:border-red-200 hover:text-red-500">
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(SearchHistory);
