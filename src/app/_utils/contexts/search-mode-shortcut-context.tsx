"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import searchConfig from "../constants/search-config";

type SearchMode = keyof typeof searchConfig.searchModeConfig;

type SearchModeShortcutContextValue = {
  searchMode: SearchMode;
  setSearchMode: (mode: SearchMode) => void;
  searchModeEntries: [SearchMode, (typeof searchConfig.searchModeConfig)[SearchMode]][];
  shortcutLabelMap: Record<SearchMode, string>;
};

const SearchModeShortcutContext = createContext<SearchModeShortcutContextValue | undefined>(undefined);

export function SearchModeShortcutProvider({ children }: { children: ReactNode }) {
  const [searchMode, setSearchMode] = useState<SearchMode>("web");

  const searchModeEntries = useMemo(
    () =>
      Object.entries(searchConfig.searchModeConfig) as [
        SearchMode,
        (typeof searchConfig.searchModeConfig)[SearchMode]
      ][],
    []
  );

  const shortcutLabelMap = useMemo(() => {
    return searchModeEntries.reduce<Record<SearchMode, string>>((acc, [mode], index) => {
      acc[mode] = `C+${index + 1}`;
      return acc;
    }, {} as Record<SearchMode, string>);
  }, [searchModeEntries]);

  useEffect(() => {
    const handleShortcutKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }

      if (event.altKey || event.shiftKey) {
        return;
      }

      const shortcutIndex = Number.parseInt(event.key, 10);
      if (!Number.isInteger(shortcutIndex) || shortcutIndex <= 0) {
        return;
      }

      const entry = searchModeEntries[shortcutIndex - 1];
      if (!entry) {
        return;
      }

      event.preventDefault();
      const [targetMode] = entry;
      setSearchMode(targetMode);
    };

    document.addEventListener("keydown", handleShortcutKeyDown);

    return () => {
      document.removeEventListener("keydown", handleShortcutKeyDown);
    };
  }, [searchModeEntries]);

  const value = useMemo(
    () => ({
      searchMode,
      setSearchMode,
      searchModeEntries,
      shortcutLabelMap
    }),
    [searchMode, searchModeEntries, shortcutLabelMap]
  );

  return <SearchModeShortcutContext.Provider value={value}>{children}</SearchModeShortcutContext.Provider>;
}

export function useSearchModeShortcuts() {
  const context = useContext(SearchModeShortcutContext);
  if (!context) {
    throw new Error("useSearchModeShortcuts must be used within a SearchModeShortcutProvider");
  }
  return context;
}
