"use client";

import shortcutFuncs from "@/app/_utils/funcs/shortcuts-func";
import { ShortcutT } from "@/app/_utils/types/shortcuts-type";
import { useEffect, useMemo, useState } from "react";
import shutcuts from "../_data/shortcuts";
import jsToBase64Func from "../_utils/funcs/jsToBase64";
import Shortcut from "./shortcut";

export default function MoreShortcut({ loadShortcuts }: { loadShortcuts: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const filteredShortcuts = useMemo(() => {
    const baseShortcuts = !searchKeyword.trim() ? shutcuts : shortcutFuncs.findByName(searchKeyword);

    const list = Array.isArray(baseShortcuts) ? baseShortcuts : [];

    if (!showSelectedOnly) {
      return list;
    }

    return list.filter((item) => loadShortcuts.includes(item.id));
  }, [searchKeyword, showSelectedOnly, loadShortcuts]);

  const groupedShortcuts = useMemo(() => {
    const groups = new Map<string, { category: string; items: ShortcutT[] }>();

    filteredShortcuts.forEach((item) => {
      const key = item.categoryCode || item.category;
      const existing = groups.get(key);
      if (existing) {
        existing.items.push(item);
      } else {
        groups.set(key, { category: item.category, items: [item] });
      }
    });

    return Array.from(groups.entries())
      .map(([categoryKey, value]) => ({
        categoryKey,
        category: value.category,
        items: value.items
      }))
      .filter(({ items }) => items.length > 0);
  }, [filteredShortcuts]);

  const onChangeFavorite = (id: string) => {
    const newShortcuts = [...loadShortcuts];
    const index = newShortcuts.indexOf(id);
    if (index > -1) {
      newShortcuts.splice(index, 1);
    } else {
      newShortcuts.push(id);
    }

    const lzSearchParams = jsToBase64Func.encodeToUrl(newShortcuts);

    window.location.href = `/?shortcuts=${lzSearchParams}`;
  };

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
                    className="w-full rounded-full border border-[#03c75a]/60 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#03c75a] focus:outline-none focus:ring-1 focus:ring-[#03c75a]"
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
                    onClick={() => setIsFullHeight((prev) => !prev)}
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
              className={`flex-1 min-h-0 overflow-y-auto px-4 pb-4 ${
                isFullHeight ? "max-h-none" : "max-h-[calc(60vh-96px)]"
              }`}>
              {groupedShortcuts.length > 0 ? (
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
                            isFavorite={loadShortcuts.includes(item.id)}
                            onClick={() => onChangeFavorite(item.id)}
                            className="h-full rounded-2xl border border-gray-100 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#03c75a] hover:shadow-md"
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
