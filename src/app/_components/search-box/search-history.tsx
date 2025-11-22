"use client";

import { memo, useEffect, useRef, useState, type MouseEvent } from "react";
import CenterToast from "../common/center-toast";

export type SearchHistoryProps = {
  items: string[];
  isOpen: boolean;
  onSelect: (value: string) => void;
  onClear: () => void;
  onDelete: (value: string) => void;
};

const COPY_FEEDBACK_DURATION = 2000;

function SearchHistory({ items, isOpen, onSelect, onClear, onDelete }: SearchHistoryProps) {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const copyMessageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyMessageTimeoutRef.current) {
        clearTimeout(copyMessageTimeoutRef.current);
      }
    };
  }, []);

  if (items.length === 0) {
    return null;
  }

  const fallbackCopyToClipboard = (value: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.style.position = "fixed";
      textArea.style.top = "-1000px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (error) {
      console.error("검색 기록 복사 실패(fallback)", error);
      return false;
    }
  };

  const showCopyMessage = (message: string) => {
    setCopyMessage(message);

    if (copyMessageTimeoutRef.current) {
      clearTimeout(copyMessageTimeoutRef.current);
    }

    copyMessageTimeoutRef.current = setTimeout(() => {
      setCopyMessage(null);
    }, COPY_FEEDBACK_DURATION);
  };

  const copyHistoryItem = async (value: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        showCopyMessage("검색어가 복사되었습니다.");
        return;
      }

      if (fallbackCopyToClipboard(value)) {
        showCopyMessage("검색어가 복사되었습니다.");
        return;
      }
    } catch (error) {
      console.error("검색 기록 복사 실패", error);
    }

    showCopyMessage("검색어 복사에 실패했습니다.");
  };

  const handleContextCopy = async (event: MouseEvent<HTMLButtonElement>, value: string) => {
    event.preventDefault();
    await copyHistoryItem(value);
  };

  const containerClass = `relative z-10 overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 ease-out sm:rounded-lg ${
    isOpen
      ? "border border-gray-200 p-4 opacity-100 translate-y-0 max-h-72"
      : "pointer-events-none border-transparent p-0 opacity-0 -translate-y-2 max-h-0"
  }`;

  return (
    <>
      <CenterToast message={copyMessage} />
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
                onContextMenu={(event) => handleContextCopy(event, item)}
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
    </>
  );
}

export default memo(SearchHistory);
