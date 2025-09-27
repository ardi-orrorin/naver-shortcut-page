import LZString from "lz-string";

const encodeToUrl = (data: string[]): string => {
  const jsonStr = JSON.stringify(data);
  const base64Str = LZString.compressToEncodedURIComponent(jsonStr);

  return base64Str;
};

const decodeFromUrl = (base64Str: string | null): string[] => {
  if (!base64Str) {
    return [] as string[];
  }

  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(base64Str);

    if (!jsonStr) {
      return [] as string[];
    }

    const data = JSON.parse(jsonStr);

    return data;
  } catch (error) {
    console.error(error);
    return [] as string[];
  }
};

const jsToBase64Func = {
  encodeToUrl,
  decodeFromUrl
};

export default jsToBase64Func;
