"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "naver-shotcut-search-history";
const HISTORY_LIMIT = 5;
const HISTORY_HIDE_DELAY = 140;

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hideHistoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    window.open(
      `https://search.naver.com/search.naver?query=${encodeURIComponent(trimmed)}`,
      "_blank",
      "noopener,noreferrer"
    );

    const nextHistory = [trimmed, ...history.filter((item) => item !== trimmed)].slice(0, HISTORY_LIMIT);
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
      setIsHistoryOpen(false);
      setIsInputFocused(false);
    }, HISTORY_HIDE_DELAY);
  };

  const historyContainerClass = `overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 ease-out sm:rounded-lg ${
    isHistoryOpen
      ? "border border-gray-200 p-4 opacity-100 translate-y-0 max-h-72"
      : "pointer-events-none border-transparent p-0 opacity-0 -translate-y-2 max-h-0"
  }`;

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-3 rounded-2xl border border-[#03c75a] bg-white px-4 py-4 shadow-sm transition-all duration-200 ease-out sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:px-5 sm:py-3 ${
          isInputFocused ? "scale-[1.01] shadow-lg sm:shadow-xl" : ""
        }`}
      >
        <div className="flex w-full items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center text-[#03c75a]" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 3.482 9.757l.18-.171.171-.18A5.5 5.5 0 0 0 10.5 5Zm8.72 11.438 2.22 2.22-1.06 1.06-2.22-2.219 1.06-1.061Z" />
            </svg>
          </span>
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
            placeholder="검색어를 입력하세요"
            className="h-10 flex-1 rounded-xl border border-gray-100 bg-gray-50 px-4 text-base text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:border-[#03c75a] focus:bg-white focus:outline-none sm:h-7 sm:border-0 sm:bg-transparent sm:px-0"
          />
        </div>
        <button
          type="submit"
          className="h-11 w-full rounded-full bg-[#03c75a] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#02b856] focus:outline-none focus:ring-2 focus:ring-[#03c75a] focus:ring-offset-2 sm:ml-3 sm:h-10 sm:w-20"
        >
          검색
        </button>
      </form>

      {history.length > 0 && (
        <div className={historyContainerClass}>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-gray-700">최근 검색어</span>
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-xs text-gray-400 transition-colors duration-150 hover:text-gray-600"
            >
              전체삭제
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {history.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => handleSelectHistory(item)}
                  className="w-full rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-700 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#03c75a] hover:text-[#03c75a] sm:w-auto sm:py-1.5"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
