import shortcuts from "@/app/_utils/_constants/shortcuts";
import { ShortcutT } from "../types/shortcuts-type";
import { searchStrFuncs } from "./serach-str";

const findById = (id: string): ShortcutT | undefined => {
  return shortcuts.find((shortcut) => shortcut.id === id);
};

const findByIds = (ids: string[]): ShortcutT[] => {
  return shortcuts.filter((shortcut) => ids.includes(shortcut.id));
};

const findByName = (keyword: string): ShortcutT[] => {
  const normalizedKeyword = searchStrFuncs.normalizeText(keyword);
  if (!normalizedKeyword) {
    return [];
  }

  const keywordInitial = searchStrFuncs.toInitialConsonants(normalizedKeyword);

  return shortcuts.filter(({ name, description }) => {
    const normalizedName = searchStrFuncs.normalizeText(name);
    const normalizedDescription = searchStrFuncs.normalizeText(description);
    if (normalizedName.includes(normalizedKeyword) || normalizedDescription.includes(normalizedKeyword)) {
      return true;
    }

    const nameInitial = searchStrFuncs.toInitialConsonants(name);
    const descInitial = searchStrFuncs.toInitialConsonants(description);

    if (!keywordInitial) {
      return false;
    }

    return nameInitial.includes(keywordInitial) || descInitial.includes(keywordInitial);
  });
};

export const shortcutFuncs = {
  findById,
  findByIds,
  findByName
};

export default shortcutFuncs;
