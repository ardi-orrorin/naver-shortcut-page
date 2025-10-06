"use client";

import type { UIEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useShortcutGroups } from "../_utils/contexts/use-shortcut-groups";
import jsToBase64Func from "../_utils/funcs/jsToBase64";
import { VirtualRow } from "./more-shortcut/virtualized-row";
import VirtualizedShortcutList from "./more-shortcut/virtualized-shortcut-list";
import Shortcut from "./shortcut";

type MoreShortcutProps = {
  loadShortcuts: string[];
  imageQuality: number;
};

const VIRTUALIZATION_THRESHOLD = 50;

export default function MoreShortcut({ loadShortcuts, imageQuality }: MoreShortcutProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [listHeight, setListHeight] = useState(360);
  const [autoExpandEnabled, setAutoExpandEnabled] = useState(true);
  const scrollAreaRef = useRef<NonNullable<HTMLDivElement>>(null);

  const resolvedListHeight = Math.max(Math.floor(listHeight), 240);

  const favoriteIdSet = useMemo(() => new Set(loadShortcuts), [loadShortcuts]);
  const { groups: groupedShortcuts } = useShortcutGroups(searchKeyword, favoriteIdSet, showSelectedOnly);

  const virtualRows = useMemo(() => {
    const rows: VirtualRow[] = [];

    groupedShortcuts.forEach(({ categoryKey, category, items }) => {
      rows.push({ type: "category", categoryKey, category });
      items.forEach((item) => {
        rows.push({ type: "item", categoryKey, item });
      });
    });

    return rows;
  }, [groupedShortcuts]);

  const shouldVirtualize = isCompactLayout && virtualRows.length > VIRTUALIZATION_THRESHOLD;

  const onChangeFavorite = useCallback(
    (id: string) => {
      const newShortcuts = [...loadShortcuts];
      const index = newShortcuts.indexOf(id);
      if (index > -1) {
        newShortcuts.splice(index, 1);
      } else {
        newShortcuts.push(id);
      }

      const lzSearchParams = jsToBase64Func.encodeToUrl(newShortcuts);

      window.location.href = `/?shortcuts=${lzSearchParams}`;
    },
    [loadShortcuts]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleChange = () => setIsCompactLayout(mediaQuery.matches);

    handleChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    mediaQuery.addListener(handleChange);
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const computeHeight = () => {
      const viewport = window.innerHeight || 0;
      const raw = isFullHeight ? viewport - 160 : viewport * 0.6 - 96;
      const fallback = isFullHeight ? viewport - 200 : 360;
      const preferred = Number.isFinite(raw) ? raw : fallback;
      const upperBound = Math.max(isFullHeight ? viewport - 120 : viewport * 0.75, 320);
      const height = Math.max(Math.min(preferred, upperBound), 240);

      setListHeight(height);
    };

    computeHeight();
    window.addEventListener("resize", computeHeight);

    return () => {
      window.removeEventListener("resize", computeHeight);
    };
  }, [isFullHeight]);

  useEffect(() => {
    if (!isCompactLayout) {
      setAutoExpandEnabled(true);
    }
  }, [isCompactLayout]);

  const hasResults = groupedShortcuts.length > 0;
  const showVirtualList = shouldVirtualize && hasResults;

  const handleScrollableAreaScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (!isCompactLayout) {
        return;
      }

      if (event.currentTarget.scrollTop <= 0) {
        setAutoExpandEnabled(true);
      } else if (!isFullHeight && autoExpandEnabled) {
        setIsFullHeight(true);
      }
    },
    [isCompactLayout, isFullHeight, autoExpandEnabled]
  );

  const handleVirtualizedScroll = useCallback(
    (scrollTop: number) => {
      if (!isCompactLayout) {
        return;
      }

      if (scrollTop <= 0) {
        setAutoExpandEnabled(true);
        return;
      }

      if (!isFullHeight && autoExpandEnabled) {
        setIsFullHeight(true);
      }
    },
    [isCompactLayout, isFullHeight, autoExpandEnabled]
  );

  const handleToggleFullHeight = useCallback(() => {
    setIsFullHeight((prev) => {
      const next = !prev;

      if (!next) {
        setAutoExpandEnabled(false);
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTo({ top: 0, behavior: "auto" });
        }
      } else {
        setAutoExpandEnabled(true);
      }

      return next;
    });
  }, []);

  useEffect(() => {
    if (!isExpanded) {
      setIsFullHeight(false);
    }
  }, [isExpanded]);

  return (
    <section className="relative flex w-full flex-col gap-4 px-4">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center self-center gap-2 rounded-full border border-[#03c75a] px-4 py-2 text-sm font-semibold text-[#03c75a] transition-colors hover:bg-[#03c75a] hover:text-white">
        더보기 <span aria-hidden="true">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <>
          {isFullHeight && <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" aria-hidden="true" />}
          <div
            className={`flex w-full flex-col overflow-hidden border border-gray-200 bg-white ${
              isFullHeight
                ? "fixed inset-0 z-50 mx-auto h-full max-w-4xl shadow-2xl sm:inset-6 sm:rounded-3xl"
                : "max-h-[60vh] rounded-2xl shadow-inner"
            }`}
            role="list"
            aria-label="추가 바로가기 목록">
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-4 py-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <label htmlFor="more-shutcut-search" className="sr-only">
                    서비스 검색
                  </label>
                  <input
                    id="more-shutcut-search"
                    type="search"
                    value={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.target.value)}
                    placeholder="서비스명을 입력하거나 초성으로 검색하세요"
                    autoFocus
                    className="w-full rounded-full border border-[#03c75a]/60 px-4 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-[#03c75a] focus:outline-none focus:ring-1 focus:ring-[#03c75a]"
                  />
                </div>
                <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:flex sm:items-center sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchKeyword("")}
                    disabled={!searchKeyword}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500 transition hover:border-[#03c75a] hover:text-[#03c75a] disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300">
                    검색 초기화
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const basePath = window.location.pathname || "/";
                      window.location.href = basePath;
                    }}
                    disabled={loadShortcuts.length === 0}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500 transition hover:border-red-400 hover:text-red-500 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300">
                    즐겨찾기 초기화
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSelectedOnly((prev) => !prev)}
                    aria-pressed={showSelectedOnly}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      showSelectedOnly
                        ? "border-[#03c75a] bg-[#03c75a] text-white"
                        : "border-gray-200 text-gray-500 hover:border-[#03c75a] hover:text-[#03c75a]"
                    }`}>
                    선택만 보기
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleFullHeight}
                    aria-pressed={isFullHeight}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      isFullHeight
                        ? "border-[#03c75a] bg-[#03c75a] text-white"
                        : "border-gray-200 text-gray-500 hover:border-[#03c75a] hover:text-[#03c75a]"
                    }`}>
                    {isFullHeight ? "축소" : "최대화"}
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400">예: 쇼핑, ㅅㅍ, ㄴㅍ, 메모</p>
            </div>
            <div
              ref={scrollAreaRef}
              className={`flex-1 min-h-0 px-4 pb-4 ${isFullHeight ? "max-h-none" : "max-h-[calc(60vh-96px)]"} ${
                showVirtualList ? "overflow-hidden" : "overflow-y-auto"
              }`}
              onScroll={handleScrollableAreaScroll}>
              {showVirtualList ? (
                <VirtualizedShortcutList
                  favoriteIdSet={favoriteIdSet}
                  height={resolvedListHeight}
                  onChangeFavorite={onChangeFavorite}
                  onScroll={handleVirtualizedScroll}
                  virtualRows={virtualRows}
                  imageQuality={imageQuality}
                />
              ) : hasResults ? (
                <div className="flex flex-col gap-6">
                  {groupedShortcuts.map(({ categoryKey, category, items }) => (
                    <section key={categoryKey} className="space-y-3">
                      <h3 className="px-1 text-sm font-semibold text-gray-600">{category}</h3>
                      <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                          <Shortcut
                            key={`more-${item.id}`}
                            {...item}
                            isEditable
                            isFavorite={favoriteIdSet.has(item.id)}
                            onClick={() => onChangeFavorite(item.id)}
                            className="h-full rounded-2xl border border-gray-100 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#03c75a] hover:shadow-md"
                            imageQuality={imageQuality}
                          />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
                  {showSelectedOnly
                    ? "선택된 바로가기가 없습니다. 원하는 서비스를 먼저 즐겨찾기에 추가해 보세요."
                    : "검색 결과가 없습니다. 다른 키워드나 초성을 입력해 보세요."}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
