import jsToBase64Func from "@/utils/jsToBase64";
import { findShutcutByIds } from "@/utils/shutcuts";
import MoreShutcut from "./_components/more-shutcut";
import SearchBox from "./_components/search-box";
import Shutcut from "./_components/shutcut";
import Title from "./_components/title";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Home({ searchParams = {} }: PageProps) {
  const rawParam = searchParams.shutcuts;
  const encoded = Array.isArray(rawParam) ? rawParam.at(0) : rawParam;
  const decoded = encoded ? jsToBase64Func.decodeFromUrl(encoded) : [];
  const loadShutcuts = Array.isArray(decoded) ? (decoded as string[]) : [];

  const selectedShutcuts = findShutcutByIds(loadShutcuts);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <Title />
      <SearchBox />
      {selectedShutcuts.length > 0 && (
        <div className="flex w-full flex-wrap justify-center gap-4 px-4">
          {selectedShutcuts.map((shutcut) => (
            <Shutcut
              key={shutcut.id}
              {...{
                ...shutcut,
                isFavorite: false,
                isEditable: false
              }}
            />
          ))}
        </div>
      )}
      <MoreShutcut loadShutcuts={loadShutcuts} />
    </div>
  );
}
