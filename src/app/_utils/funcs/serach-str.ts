const HANGUL_BASE = 0xac00;
const HANGUL_END = 0xd7a3;

const INITIAL_CONSONANTS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ"
];

const normalizeText = (value: string): string => value.toLowerCase().replace(/\s+/g, "").normalize("NFC");

const toInitialConsonants = (text: string): string =>
  Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code < HANGUL_BASE || code > HANGUL_END) {
        return char;
      }
      const offset = code - HANGUL_BASE;
      const index = Math.floor(offset / 588);
      return INITIAL_CONSONANTS[index];
    })
    .join("")
    .replace(/\s+/g, "");

export const searchStrFuncs = {
  normalizeText,
  toInitialConsonants
};
