"use client";

import jsToBase64Func from "@/utils/jsToBase64";
import shutcuts from "@/utils/shutcuts";
import { useState } from "react";
import Shutcut from "./shutcut";

export default function MoreShutcut({ loadShutcuts }: { loadShutcuts: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const onChangeFavorite = (id: string) => {
    const newShutcuts = [...loadShutcuts];
    const index = newShutcuts.indexOf(id);
    if (index > -1) {
      newShutcuts.splice(index, 1);
    } else {
      newShutcuts.push(id);
    }

    const lzSearchParams = jsToBase64Func.encodeToUrl(newShutcuts);

    window.location.href = `/?shutcuts=${lzSearchParams}`;
  };

  return (
    <section className="w-full flex flex-col gap-4 px-4">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center self-center gap-2 rounded-full border border-[#03c75a] px-4 py-2 text-sm font-semibold text-[#03c75a] transition-colors hover:bg-[#03c75a] hover:text-white">
        더보기 <span aria-hidden="true">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div
          className="w-full max-h-[50vh] overflow-y-auto rounded-2xl border border-gray-200 p-4 shadow-inner"
          role="list"
          aria-label="추가 바로가기 목록">
          <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shutcuts.map((item) => (
              <Shutcut
                key={`more-${item.id}`}
                {...item}
                isEditable
                isFavorite={loadShutcuts.includes(item.id)}
                onClick={() => onChangeFavorite(item.id)}
                className="h-full rounded-2xl border border-gray-100 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#03c75a] hover:shadow-md"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
