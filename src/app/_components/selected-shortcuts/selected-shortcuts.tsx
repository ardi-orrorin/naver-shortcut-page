"use client";

import "@/app/_styles/selected-shortcuts.css";
import jsToBase64Func from "@/app/_utils/funcs/jsToBase64";
import shortcutFuncs from "@/app/_utils/funcs/shortcuts-func";
import type { ShortcutT } from "@/app/_utils/types/shortcuts-type";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Shortcut from "../shortcut";
import { DRAG_ACTIVATION_DISTANCE, TILE_GAP, TILE_HEIGHT, TILE_WIDTH, TRACK_WIDTH } from "./constants";
import ScrollTrack from "./scroll-track";
import SortableShortcut from "./sortable-shortcut";
import { useScrollIndicator } from "./use-scroll-indicator";
import { useShortcutLayout } from "./use-shortcut-layout";

type SelectedShortcutsProps = {
  ids: string[];
  imageQuality: number;
};

const TILE_CLASS =
  "flex h-[90px] min-h-[90px] max-h-[90px] min-w-[75px] w-[75px] max-w-[75px] items-center justify-center";

const buildReorderedUrl = (ids: string[]) => {
  if (ids.length === 0) {
    return "/";
  }

  const encoded = jsToBase64Func.encodeToUrl(ids);
  return `/?shortcuts=${encoded}`;
};

export default function SelectedShortcuts({ ids, imageQuality }: SelectedShortcutsProps) {
  const [currentIds, setCurrentIds] = useState<string[]>(ids);
  const [isMounted, setIsMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: DRAG_ACTIVATION_DISTANCE
      }
    })
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentIds(ids);
  }, [ids]);

  const orderedShortcuts = useMemo(() => {
    return currentIds.map((id) => shortcutFuncs.findById(id)).filter((item): item is ShortcutT => Boolean(item));
  }, [currentIds]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const updateWidth = () => {
      setContainerWidth(wrapper.clientWidth);
    };

    updateWidth();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateWidth);
      observer.observe(wrapper);
      return () => observer.disconnect();
    }

    const handleResize = () => updateWidth();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);

  const { layout, rowsUsed, gridHeight, gridTemplateColumns, gridColumns } = useShortcutLayout(
    orderedShortcuts,
    containerWidth
  );

  const scrollDependencyKey = useMemo(() => {
    return [orderedShortcuts.length, gridColumns, rowsUsed, containerWidth].join("-");
  }, [orderedShortcuts.length, gridColumns, rowsUsed, containerWidth]);

  const { hasScroll, scrollRatio, thumbWidth, handleScroll } = useScrollIndicator(
    scrollContainerRef,
    scrollDependencyKey
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = currentIds.indexOf(active.id as string);
    const newIndex = currentIds.indexOf(over.id as string);

    const nextIds = arrayMove(currentIds, oldIndex, newIndex);
    setCurrentIds(nextIds);

    const targetUrl = buildReorderedUrl(nextIds);
    window.location.href = targetUrl;
  };

  if (orderedShortcuts.length === 0) {
    return null;
  }

  const gridStyle: CSSProperties = {
    gridTemplateColumns,
    gridTemplateRows: `repeat(${rowsUsed}, ${TILE_HEIGHT}px)`,
    height: `${gridHeight}px`,
    ["--selected-shortcuts-gap" as keyof CSSProperties]: `${TILE_GAP}px`,
    ["--selected-shortcuts-justify" as keyof CSSProperties]: hasScroll ? "flex-start" : "center",
    ["--selected-shortcuts-tile-width" as keyof CSSProperties]: `${TILE_WIDTH}px`,
    ["--selected-shortcuts-tile-height" as keyof CSSProperties]: `${TILE_HEIGHT}px`,
    ["--selected-shortcuts-track-width" as keyof CSSProperties]: `${TRACK_WIDTH}px`
  };

  if (!isMounted) {
    return (
      <section className="flex w-full max-w-4xl flex-col gap-4 px-4">
        <div ref={wrapperRef} className="relative pb-3">
          <div
            ref={scrollContainerRef}
            className="selected-shortcuts__scroller custom-scrollbar"
            style={{ height: `${gridHeight}px` }}
            onScroll={handleScroll}>
            <div className="selected-shortcuts__grid" style={gridStyle}>
              {layout.map(({ shortcut, column, row }) => (
                <div
                  key={shortcut.id}
                  className="selected-shortcuts__grid-item"
                  style={{ gridColumnStart: column + 1, gridRowStart: row + 1 }}>
                  <div className={TILE_CLASS}>
                    <Shortcut {...shortcut} isFavorite={false} isEditable={false} imageQuality={imageQuality} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ScrollTrack hasScroll={hasScroll} scrollRatio={scrollRatio} thumbWidth={thumbWidth} />
        </div>
      </section>
    );
  }

  return (
    <section className="flex w-full max-w-4xl flex-col gap-4 px-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={currentIds} strategy={rectSortingStrategy}>
          <div ref={wrapperRef} className="relative pb-3">
            <div
              ref={scrollContainerRef}
              className="selected-shortcuts__scroller custom-scrollbar"
              style={{ height: `${gridHeight}px` }}
              onScroll={handleScroll}>
              <div className="selected-shortcuts__grid" style={gridStyle}>
                {layout.map(({ shortcut, column, row }) => (
                  <SortableShortcut
                    key={shortcut.id}
                    id={shortcut.id}
                    shortcut={shortcut}
                    column={column}
                    row={row}
                    imageQuality={imageQuality}
                  />
                ))}
              </div>
            </div>
            <ScrollTrack hasScroll={hasScroll} scrollRatio={scrollRatio} thumbWidth={thumbWidth} />
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}
