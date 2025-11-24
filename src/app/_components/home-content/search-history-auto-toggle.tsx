"use client";

import { useSearchHistoryPreference } from "../../_utils/contexts/search-history-preference-context";

function SearchHistoryAutoToggle() {
  const { autoSearchEnabled, toggleAutoSearch, initialized } = useSearchHistoryPreference();

  if (!initialized) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleAutoSearch}
      aria-pressed={autoSearchEnabled}
      className={`hidden sm:flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors ${
        autoSearchEnabled
          ? "border-[#03c75a] bg-[#03c75a]/10 text-[#03c75a]"
          : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
      }`}>
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: autoSearchEnabled ? "#03c75a" : "#9ca3af" }}
      />
      {autoSearchEnabled ? "검색 기록 클릭 시 검색" : "기록 클릭 시 입력만"}
    </button>
  );
}

export default SearchHistoryAutoToggle;
