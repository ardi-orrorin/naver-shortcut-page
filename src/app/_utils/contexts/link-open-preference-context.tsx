"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Nullable } from "../types/common-type";

const STORAGE_KEY = "naver-shortcut-link-open-mode";

type Preference = "current" | "new-tab";

type LinkOpenPreferenceContextValue = {
  preference: Preference;
  isNewTab: boolean;
  toggle: () => void;
  setPreference: (preference: Preference) => void;
  initialized: boolean;
};

const LinkOpenPreferenceContext = createContext<Nullable<LinkOpenPreferenceContextValue>>(null);

export function LinkOpenPreferenceProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<NonNullable<Preference>>("current");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "new-tab" || stored === "current") {
        setPreferenceState(stored);
      }
    } catch (error) {
      console.error("링크 열기 설정을 불러오지 못했습니다", error);
    } finally {
      setInitialized(true);
    }
  }, []);

  const updatePreference = useCallback((next: Preference | ((prev: Preference) => Preference)) => {
    setPreferenceState((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      try {
        localStorage.setItem(STORAGE_KEY, resolved);
      } catch (error) {
        console.error("링크 열기 설정을 저장하지 못했습니다", error);
      }
      return resolved;
    });
  }, []);

  const setPreference = useCallback(
    (next: Preference) => {
      updatePreference(next);
    },
    [updatePreference]
  );

  const toggle = useCallback(() => {
    updatePreference((prev) => (prev === "new-tab" ? "current" : "new-tab"));
  }, [updatePreference]);

  const value = useMemo<LinkOpenPreferenceContextValue>(
    () => ({
      preference,
      isNewTab: preference === "new-tab",
      toggle,
      setPreference,
      initialized
    }),
    [preference, toggle, setPreference, initialized]
  );

  return <LinkOpenPreferenceContext.Provider value={value}>{children}</LinkOpenPreferenceContext.Provider>;
}

export function useLinkOpenPreference() {
  const context = useContext(LinkOpenPreferenceContext);
  if (!context) {
    return {
      preference: "current" as const,
      isNewTab: false,
      toggle: () => {
        alert("LinkOpenPreferenceProvider를 찾을 수 없어 기본 동작(현재 탭)이 적용되었습니다.");
      },
      setPreference: () => {
        alert("LinkOpenPreferenceProvider를 찾을 수 없어 기본 동작(현재 탭)이 적용되었습니다.");
      },
      initialized: true
    } satisfies LinkOpenPreferenceContextValue;
  }
  return context;
}
