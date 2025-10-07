"use client";

import type { ShortcutT } from "@/app/_utils/types/shortcuts-type";
import { useMemo } from "react";
import { GRID_ROWS, TILE_GAP, TILE_HEIGHT, TILE_WIDTH } from "../constants/shortcut-constants";

export type ShortcutLayoutItem = {
  shortcut: ShortcutT;
  column: number;
  row: number;
};

export type ShortcutLayoutResult = {
  rowsUsed: number;
  gridHeight: number;
  gridTemplateColumns: string;
  layout: ShortcutLayoutItem[];
  gridColumns: number;
};

export function useShortcutLayout(shortcuts: ShortcutT[], containerWidth: number): ShortcutLayoutResult {
  const columnsPerRow = useMemo(() => {
    if (containerWidth > 0) {
      return Math.max(1, Math.floor((containerWidth + TILE_GAP) / (TILE_WIDTH + TILE_GAP)));
    }

    // Fallback: attempt to keep items within 2 rows before overflow
    return Math.max(1, Math.ceil(shortcuts.length / GRID_ROWS));
  }, [containerWidth, shortcuts.length]);

  const rowsUsed = useMemo(() => {
    if (shortcuts.length === 0) {
      return 0;
    }

    return Math.min(GRID_ROWS, Math.ceil(shortcuts.length / columnsPerRow));
  }, [shortcuts.length, columnsPerRow]);

  const requiredColumns = useMemo(() => {
    if (rowsUsed === 0) {
      return 1;
    }

    return Math.max(1, Math.ceil(shortcuts.length / rowsUsed));
  }, [shortcuts.length, rowsUsed]);

  const gridColumns = useMemo(() => {
    return Math.max(columnsPerRow, requiredColumns);
  }, [columnsPerRow, requiredColumns]);

  const gridHeight = rowsUsed * TILE_HEIGHT + Math.max(rowsUsed - 1, 0) * TILE_GAP;

  const gridTemplateColumns = useMemo(() => {
    return `repeat(${gridColumns}, ${TILE_WIDTH}px)`;
  }, [gridColumns]);

  const layout = useMemo<ShortcutLayoutItem[]>(() => {
    if (shortcuts.length === 0 || rowsUsed === 0) {
      return [];
    }

    return shortcuts.map((shortcut, index) => {
      const row = Math.min(Math.floor(index / gridColumns), rowsUsed - 1);
      const column = index % gridColumns;
      return { shortcut, column, row };
    });
  }, [shortcuts, gridColumns, rowsUsed]);

  return {
    rowsUsed,
    gridHeight,
    gridTemplateColumns,
    layout,
    gridColumns
  };
}
