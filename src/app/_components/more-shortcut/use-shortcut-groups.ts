"use client";

import { useDeferredValue, useMemo } from "react";
import shortcutFuncs from "@/app/_utils/funcs/shortcuts-func";
import type { ShortcutT } from "@/app/_utils/types/shortcuts-type";
import shortcutsData from "../../_data/shortcuts";

export type ShortcutGroup = {
  categoryKey: string;
  category: string;
  items: ShortcutT[];
};

export function useShortcutGroups(
  keyword: string,
  favoriteIdSet: Set<string>,
  showSelectedOnly: boolean
) {
  const deferredKeyword = useDeferredValue(keyword);

  const filteredShortcuts = useMemo(() => {
    const trimmedKeyword = deferredKeyword.trim();
    const baseShortcuts = trimmedKeyword ? shortcutFuncs.findByName(trimmedKeyword) : shortcutsData;
    const list = Array.isArray(baseShortcuts) ? baseShortcuts : [];

    if (!showSelectedOnly) {
      return list;
    }

    return list.filter((item) => favoriteIdSet.has(item.id));
  }, [deferredKeyword, favoriteIdSet, showSelectedOnly]);

  const groups = useMemo(() => {
    const grouped = new Map<string, { category: string; items: ShortcutT[] }>();

    filteredShortcuts.forEach((item) => {
      const key = item.categoryCode || item.category;
      const existing = grouped.get(key);

      if (existing) {
        existing.items.push(item);
      } else {
        grouped.set(key, { category: item.category, items: [item] });
      }
    });

    return Array.from(grouped.entries())
      .map(([categoryKey, value]) => ({
        categoryKey,
        category: value.category,
        items: value.items
      }))
      .filter(({ items }) => items.length > 0);
  }, [filteredShortcuts]);

  return { filteredShortcuts, groups } as const;
}
