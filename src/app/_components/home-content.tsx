"use client";

import { LinkOpenPreferenceProvider, useLinkOpenPreference } from "../_utils/contexts/link-open-preference-context";
import BookmarkHelpModal from "./bookmark-help-modal";
import MoreShortcut from "./more-shortcut";
import SearchBox from "./search-box";
import SelectedShortcuts from "./selected-shortcuts";
import Title from "./title";

type HomeContentProps = {
  loadShortcuts: string[];
};

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

function HomeContentInner({ loadShortcuts }: HomeContentProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 py-10">
      <div className="absolute left-4 top-4 z-50 sm:left-6 sm:top-6">
        <LinkOpenToggle />
      </div>
      <BookmarkHelpModal />
      <Title />
      <SearchBox />
      {loadShortcuts.length > 0 && <SelectedShortcuts ids={loadShortcuts} />}
      <MoreShortcut loadShortcuts={loadShortcuts} />
    </div>
  );
}

export default function HomeContent(props: HomeContentProps) {
  return (
    <LinkOpenPreferenceProvider>
      <HomeContentInner {...props} />
    </LinkOpenPreferenceProvider>
  );
}
