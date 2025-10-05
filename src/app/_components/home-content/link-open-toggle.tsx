"use client";

import { useLinkOpenPreference } from "../../_utils/contexts/link-open-preference-context";

function LinkOpenToggle() {
  const { isNewTab, toggle, initialized } = useLinkOpenPreference();

  if (!initialized) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isNewTab}
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors ${
        isNewTab
          ? "border-[#03c75a] bg-[#03c75a]/10 text-[#03c75a]"
          : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
      }`}>
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: isNewTab ? "#03c75a" : "#9ca3af" }}
      />
      {isNewTab ? "새 탭으로 열기" : "현재 탭에서 열기"}
    </button>
  );
}

export default LinkOpenToggle;
