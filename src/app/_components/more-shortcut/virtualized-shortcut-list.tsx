"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { List } from "react-window";
import Shortcut from "../shortcut";
import { VirtualizedRow, VirtualRow } from "./virtualized-row";

const CATEGORY_ROW_HEIGHT = 40;
const FALLBACK_ITEM_ROW_HEIGHT = 124;
const OVERSCAN_COUNT = 4;

type VirtualizedShortcutListProps = {
  favoriteIdSet: Set<string>;
  height: number;
  onChangeFavorite: (id: string) => void;
  onScroll?: (scrollTop: number) => void;
  virtualRows: VirtualRow[];
  imageQuality: number;
};

export default function VirtualizedShortcutList({
  favoriteIdSet,
  height,
  onChangeFavorite,
  onScroll,
  virtualRows,
  imageQuality
}: VirtualizedShortcutListProps) {
  const [measuredItemHeight, setMeasuredItemHeight] = useState(FALLBACK_ITEM_ROW_HEIGHT);
  const measurementRef = useCallback((element: HTMLDivElement | null) => {
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.height > 0) {
      setMeasuredItemHeight(Math.ceil(rect.height));
    }
  }, []);

  const sampleItem = useMemo(() => virtualRows.find((row) => row.type === "item") ?? null, [virtualRows]);

  useEffect(() => {
    if (!sampleItem) {
      setMeasuredItemHeight(FALLBACK_ITEM_ROW_HEIGHT);
    }
  }, [sampleItem]);

  const rowHeight = useMemo(() => {
    return (index: number) => {
      const row = virtualRows[index];
      if (!row) {
        return FALLBACK_ITEM_ROW_HEIGHT;
      }

      if (row.type === "category") {
        return CATEGORY_ROW_HEIGHT;
      }

      return measuredItemHeight;
    };
  }, [virtualRows, measuredItemHeight]);

  const rowProps = useMemo(
    () => ({ favoriteIdSet, onChangeFavorite, virtualRows, imageQuality }),
    [favoriteIdSet, onChangeFavorite, virtualRows, imageQuality]
  );

  return (
    <>
      {sampleItem ? (
        <div className="pointer-events-none fixed -z-10 opacity-0" aria-hidden ref={measurementRef}>
          <div className="box-border px-1 py-1">
            <Shortcut
              key={`measurement-${sampleItem.item.id}`}
              {...sampleItem.item}
              isEditable
              isFavorite={favoriteIdSet.has(sampleItem.item.id)}
              className="h-full w-full rounded-2xl border border-gray-100 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#03c75a] hover:shadow-md"
              imageQuality={imageQuality}
            />
          </div>
        </div>
      ) : null}
      <List
        defaultHeight={height}
        style={{ height }}
        rowCount={virtualRows.length}
        rowHeight={rowHeight}
        rowComponent={VirtualizedRow}
        rowProps={rowProps}
        overscanCount={OVERSCAN_COUNT}
        onScroll={(event) => {
          onScroll?.(event.currentTarget.scrollTop);
        }}
        className="no-scrollbar"
      />
    </>
  );
}
