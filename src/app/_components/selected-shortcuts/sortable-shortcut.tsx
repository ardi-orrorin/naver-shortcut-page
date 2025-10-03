"use client";

import type { ShortcutT } from "@/app/_utils/types/shortcuts-type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";
import Shutcut from "../shortcut";

export type SortableShortcutProps = {
  id: string;
  shortcut: ShortcutT;
  column: number;
  row: number;
};

const TILE_CLASS =
  "flex h-[90px] min-h-[90px] max-h-[90px] min-w-[75px] w-[75px] max-w-[75px] items-center justify-center";

export default function SortableShortcut({ id, shortcut, column, row }: SortableShortcutProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    gridColumnStart: column + 1,
    gridRowStart: row + 1
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="selected-shortcuts__grid-item">
      <div className={`${TILE_CLASS} cursor-grab select-none active:cursor-grabbing`}>
        <Shutcut {...shortcut} isFavorite={false} isEditable={false} />
      </div>
    </div>
  );
}
