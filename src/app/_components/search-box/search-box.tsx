"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import searchConfig from "../../_utils/constants/search-config";
import { useLinkOpenPreference } from "../../_utils/contexts/link-open-preference-context";
import SearchHistory from "./search-history";

const STORAGE_KEY = "naver-shotcut-search-history";

const HISTORY_HIDE_DELAY = 140;

export default function SearchBox({ searchHistoryLimit }: { searchHistoryLimit: number }) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { isNewTab } = useLinkOpenPreference();

  type SearchMode = keyof typeof searchConfig.searchModeConfig;

  const [searchMode, setSearchMode] = useState<SearchMode>("web");
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hideHistoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modeMenuRef = useRef<HTMLDivElement | null>(null);

  const currentMode = searchConfig.searchModeConfig[searchMode];
  const ModeIcon = currentMode.icon;
  const placeholderText = currentMode.placeholder;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed.filter((item): item is string => typeof item === "string"));
        }
      }
    } catch (error) {
      console.error("검색 기록을 불러오지 못했습니다", error);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isModeMenuOpen) {
        return;
      }
      if (modeMenuRef.current && event.target instanceof Node && !modeMenuRef.current.contains(event.target)) {
        setIsModeMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModeMenuOpen]);

  useEffect(() => {
    return () => {
      if (hideHistoryTimeoutRef.current) {
        clearTimeout(hideHistoryTimeoutRef.current);
      }
    };
  }, []);

  const persistHistory = (entries: string[]) => {
    setHistory(entries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    const targetUrl = searchConfig.searchModeConfig[searchMode].buildUrl(trimmed);
    const target = isNewTab ? "_blank" : "_self";
    const features = isNewTab ? "noopener,noreferrer" : undefined;

    window.open(targetUrl, target, features);

    const nextHistory = [trimmed, ...history.filter((item) => item !== trimmed)].slice(0, searchHistoryLimit);
    persistHistory(nextHistory);
    setIsHistoryOpen(false);
    setIsInputFocused(false);
  };

  const handleSelectHistory = (value: string) => {
    if (hideHistoryTimeoutRef.current) {
      clearTimeout(hideHistoryTimeoutRef.current);
    }
    setQuery(value);
    inputRef.current?.focus();
    setIsHistoryOpen(true);
    setIsInputFocused(true);
  };

  const handleClearHistory = () => {
    persistHistory([]);
    setIsHistoryOpen(false);
  };

  const handleDeleteHistoryItem = (value: string) => {
    if (hideHistoryTimeoutRef.current) {
      clearTimeout(hideHistoryTimeoutRef.current);
      hideHistoryTimeoutRef.current = null;
    }
    const nextHistory = history.filter((item) => item !== value);
    persistHistory(nextHistory);

    if (nextHistory.length === 0) {
      setIsHistoryOpen(false);
      setIsInputFocused(false);
      return;
    }

    setIsHistoryOpen(true);
  };

  const handleFocusInput = () => {
    if (hideHistoryTimeoutRef.current) {
      clearTimeout(hideHistoryTimeoutRef.current);
      hideHistoryTimeoutRef.current = null;
    }
    setIsInputFocused(true);
    if (history.length > 0) {
      setIsHistoryOpen(true);
    }
  };

  const handleBlurInput = () => {
    hideHistoryTimeoutRef.current = setTimeout(() => {
      if (!isModeMenuOpen) {
        setIsHistoryOpen(false);
        setIsInputFocused(false);
      }
    }, HISTORY_HIDE_DELAY);
  };

  const handleSelectMode = (mode: SearchMode) => {
    setSearchMode(mode);
    setIsModeMenuOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className={`relative z-30 flex flex-col gap-3 rounded-2xl border border-[#03c75a] bg-white px-4 py-4 shadow-sm transition-all duration-200 ease-out sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:px-5 sm:py-3 ${
          isInputFocused ? "scale-[1.01] shadow-lg sm:shadow-xl" : ""
        }`}>
        <div className="flex w-full items-center gap-3">
          <div className="relative" ref={modeMenuRef}>
            <button
              type="button"
              onClick={() => setIsModeMenuOpen((prev) => !prev)}
              className="flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#03c75a]/40 bg-white px-3 py-2 text-xs font-semibold text-[#03c75a] shadow-sm transition hover:border-[#03c75a] hover:text-[#03c75a] focus:border-[#03c75a] focus:outline-none focus:ring-1 focus:ring-[#03c75a]"
              aria-haspopup="listbox"
              aria-expanded={isModeMenuOpen}
              onMouseDown={(event) => {
                event.preventDefault();
              }}>
              <ModeIcon className="h-4 w-4" />
              <span>{currentMode.label}</span>
            </button>
            {isModeMenuOpen && (
              <ul
                role="listbox"
                className="absolute left-0 right-auto z-50 mt-2 min-w-[160px] rounded-2xl border border-[#03c75a]/30 bg-white p-2 text-sm shadow-xl"
                onMouseDown={(event) => event.preventDefault()}>
                {Object.entries(searchConfig.searchModeConfig).map(([modeValue, config]) => {
                  const isActive = modeValue === searchMode;
                  const OptionIcon = config.icon;
                  return (
                    <li key={modeValue}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleSelectMode(modeValue as SearchMode)}
                        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition ${
                          isActive ? "bg-[#03c75a]/10 text-[#03c75a]" : "text-gray-600 hover:bg-gray-100"
                        }`}>
                        <OptionIcon className="h-4 w-4" />
                        <span className="text-xs font-medium">{config.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <label htmlFor="naver-search" className="sr-only">
            네이버 검색어 입력
          </label>
          <input
            ref={inputRef}
            id="naver-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            placeholder={placeholderText}
            className="h-10 min-w-0 flex-1 rounded-xl border border-gray-100 bg-gray-50 px-4 text-base text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-[#03c75a] focus:bg-white focus:outline-none sm:h-7 sm:border-0 sm:bg-transparent sm:px-0"
          />
        </div>
        <button
          type="submit"
          className="h-10 w-full rounded-full bg-[#03c75a] px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#02b856] focus:outline-none focus:ring-2 focus:ring-[#03c75a] focus:ring-offset-2 sm:ml-3 sm:h-9 sm:w-24">
          검색
        </button>
      </form>

      <SearchHistory
        {...{
          items: history,
          isOpen: isHistoryOpen,
          onSelect: handleSelectHistory,
          onClear: handleClearHistory,
          onDelete: handleDeleteHistoryItem
        }}
      />
    </div>
  );
}
