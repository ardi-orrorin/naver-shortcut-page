import jsToBase64Func from "@/app/_utils/funcs/jsToBase64";
import HomeContent from "./_components/home-content/home-content";
import { EnvProvider } from "./_utils/contexts/env-context";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const rawParam = (await searchParams).shortcuts;
  const loadShortcuts = jsToBase64Func.decodeFromUrl(rawParam as string);

  const openWeatherMapApiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY ?? "";
  const imageQuality = Number(process.env.NEXT_PUBLIC_IMAGE_QUALITY ?? 30);
  const searchHistoryLimit = Number(process.env.NEXT_PUBLIC_SEARCH_HISTORY_LIMIT ?? 10);

  const envValue = {
    openWeatherMapApiKey,
    imageQuality,
    searchHistoryLimit
  };

  return (
    <EnvProvider value={envValue}>
      <HomeContent {...{ loadShortcuts }} />
    </EnvProvider>
  );
}
