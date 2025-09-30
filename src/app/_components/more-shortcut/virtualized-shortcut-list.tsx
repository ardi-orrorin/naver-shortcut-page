"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { List, type RowComponentProps } from "react-window";
import type { ShortcutT } from "@/app/_utils/types/shortcuts-type";
import Shortcut from "../shortcut";

const CATEGORY_ROW_HEIGHT = 40;
const FALLBACK_ITEM_ROW_HEIGHT = 124;
const OVERSCAN_COUNT = 4;

export type VirtualRow =
  | { type: "category"; categoryKey: string; category: string }
  | { type: "item"; categoryKey: string; item: ShortcutT };

type VirtualRowComponentProps = {
  favoriteIdSet: Set<string>;
  onChangeFavorite: (id: string) => void;
  virtualRows: VirtualRow[];
};

type VirtualizedShortcutListProps = {
  favoriteIdSet: Set<string>;
  height: number;
  onChangeFavorite: (id: string) => void;
  onScroll?: (scrollTop: number) => void;
  virtualRows: VirtualRow[];
};

const VirtualizedRow = ({
  index,
  style,
  ariaAttributes,
  favoriteIdSet,
  onChangeFavorite,
  virtualRows
}: RowComponentProps<VirtualRowComponentProps>) => {
  const row = virtualRows[index];

  if (!row) {
    return null;
  }

  if (row.type === "category") {
    return (
      <div style={style} {...ariaAttributes} className="box-border flex items-center px-2">
        <h3 className="text-sm font-semibold text-gray-600">{row.category}</h3>
      </div>
    );
  }

  return (
    <div style={style} {...ariaAttributes} className="box-border px-1 py-1">
      <Shortcut
        key={`more-${row.item.id}`}
        {...row.item}
        isEditable
        isFavorite={favoriteIdSet.has(row.item.id)}
        onClick={() => onChangeFavorite(row.item.id)}
        className="h-full w-full rounded-2xl border border-gray-100 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#03c75a] hover:shadow-md"
      />
    </div>
  );
};

const getCategoryRowHeight = () => CATEGORY_ROW_HEIGHT;

export default function VirtualizedShortcutList({
  favoriteIdSet,
  height,
  onChangeFavorite,
  onScroll,
  virtualRows
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
        return getCategoryRowHeight();
      }

      return measuredItemHeight;
    };
  }, [virtualRows, measuredItemHeight]);

  const rowProps = useMemo(
    () => ({ favoriteIdSet, onChangeFavorite, virtualRows }),
    [favoriteIdSet, onChangeFavorite, virtualRows]
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
