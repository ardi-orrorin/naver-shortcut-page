"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Nullable } from "../types/common-type";

const STORAGE_KEY = "naver-shortcut-history-auto-search";

type SearchHistoryPreferenceContextValue = {
  autoSearchEnabled: boolean;
  toggleAutoSearch: () => void;
  setAutoSearchEnabled: (enabled: boolean) => void;
  initialized: boolean;
};

const SearchHistoryPreferenceContext = createContext<Nullable<SearchHistoryPreferenceContextValue>>(null);

export function SearchHistoryPreferenceProvider({ children }: { children: ReactNode }) {
  const [autoSearchEnabled, setAutoSearchEnabled] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setAutoSearchEnabled(true);
      }
    } catch (error) {
      console.error("검색 기록 설정을 불러오지 못했습니다", error);
    } finally {
      setInitialized(true);
    }
  }, []);

  const updateAutoSearch = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setAutoSearchEnabled((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resolved));
      } catch (error) {
        console.error("검색 기록 설정을 저장하지 못했습니다", error);
      }
      return resolved;
    });
  }, []);

  const toggleAutoSearch = useCallback(() => {
    updateAutoSearch((prev) => !prev);
  }, [updateAutoSearch]);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const applyResponsiveDefault = (matches: boolean) => {
      if (matches) {
        updateAutoSearch(false);
      }
    };

    applyResponsiveDefault(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applyResponsiveDefault(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [initialized, updateAutoSearch]);

  const value = useMemo(
    () => ({
      autoSearchEnabled,
      toggleAutoSearch,
      setAutoSearchEnabled: updateAutoSearch,
      initialized
    }),
    [autoSearchEnabled, toggleAutoSearch, updateAutoSearch, initialized]
  );

  return <SearchHistoryPreferenceContext.Provider value={value}>{children}</SearchHistoryPreferenceContext.Provider>;
}

export function useSearchHistoryPreference() {
  const context = useContext(SearchHistoryPreferenceContext);
  if (!context) {
    return {
      autoSearchEnabled: false,
      toggleAutoSearch: () => {
        alert("SearchHistoryPreferenceProvider를 찾을 수 없어 기본 동작(즉시 검색 끄기)이 적용되었습니다.");
      },
      setAutoSearchEnabled: () => {
        alert("SearchHistoryPreferenceProvider를 찾을 수 없어 기본 동작(즉시 검색 끄기)이 적용되었습니다.");
      },
      initialized: true
    } satisfies SearchHistoryPreferenceContextValue;
  }
  return context;
}
