"use client";

import jsToBase64Func from "@/app/_utils/funcs/jsToBase64";
import { ShortcutT } from "@/app/_utils/types/shortcuts-type";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useEffect, useMemo, useState } from "react";
import shortcutFuncs from "../_utils/funcs/shortcuts-func";
import Shutcut from "./shortcut";

type SelectedShortcutsProps = {
  ids: string[];
};

const TILE_CLASS = "flex h-[50px] w-[50px] items-center justify-center";

const buildReorderedUrl = (ids: string[]) => {
  if (ids.length === 0) {
    return "/";
  }

  const encoded = jsToBase64Func.encodeToUrl(ids);
  return `/?shortcuts=${encoded}`;
};

const reorderList = (list: string[], startIndex: number, endIndex: number): string[] => {
  const next = [...list];
  const [removed] = next.splice(startIndex, 1);
  next.splice(endIndex, 0, removed);
  return next;
};

export default function SelectedShortcuts({ ids }: SelectedShortcutsProps) {
  const [currentIds, setCurrentIds] = useState<string[]>(ids);

  useEffect(() => {
    setCurrentIds(ids);
  }, [ids]);

  const orderedShortcuts = useMemo(() => {
    return currentIds.map((id) => shortcutFuncs.findById(id)).filter((item): item is ShortcutT => Boolean(item));
  }, [currentIds]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const nextIds = reorderList(currentIds, source.index, destination.index);
    setCurrentIds(nextIds);

    const targetUrl = buildReorderedUrl(nextIds);
    window.location.href = targetUrl;
  };

  if (orderedShortcuts.length === 0) {
    return null;
  }

  return (
    <section className="flex w-full max-w-4xl flex-col gap-4 px-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="selected-shortcuts" direction="horizontal">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps} className="flex flex-wrap justify-center gap-3">
              {orderedShortcuts.map((shutcut, index) => (
                <Draggable key={shutcut.id} draggableId={shutcut.id} index={index}>
                  {(draggableProvided, snapshot) => (
                    <li
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className="list-none">
                      <div
                        className={`${TILE_CLASS} cursor-grab select-none active:cursor-grabbing ${
                          snapshot.isDragging ? "opacity-60" : ""
                        }`}>
                        <Shutcut {...shutcut} isFavorite={false} isEditable={false} />
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
