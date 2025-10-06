import { ShortcutT } from "@/app/_utils/types/shortcuts-type";
import { RowComponentProps } from "react-window";
import Shortcut from "../shortcut";

export type VirtualRow =
  | { type: "category"; categoryKey: string; category: string }
  | { type: "item"; categoryKey: string; item: ShortcutT };

type VirtualRowComponentProps = {
  favoriteIdSet: Set<string>;
  onChangeFavorite: (id: string) => void;
  imageQuality: number;
  virtualRows: VirtualRow[];
};

export function VirtualizedRow({
  index,
  style,
  ariaAttributes,
  favoriteIdSet,
  onChangeFavorite,
  virtualRows,
  imageQuality
}: RowComponentProps<VirtualRowComponentProps>) {
  const row = virtualRows[index];

  if (!row) return null;

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
        imageQuality={imageQuality}
      />
    </div>
  );
}
