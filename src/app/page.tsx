import jsToBase64Func from "@/app/_utils/funcs/jsToBase64";
import { ensureMetricsServer } from "@/lib/metrics-server";
import { recordRootRequest } from "@/lib/metrics";
import { GoogleAnalytics } from "@next/third-parties/google";
import HomeContent from "./_components/home-content/home-content";
import { EnvProvider } from "./_utils/contexts/env-context";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  ensureMetricsServer();
  recordRootRequest();
  const params = await searchParams;
  const rawShortcutsParam = params.shortcuts;
  const shortcutsParamValue = Array.isArray(rawShortcutsParam) ? rawShortcutsParam[0] : rawShortcutsParam ?? null;
  const loadShortcuts = jsToBase64Func.decodeFromUrl(shortcutsParamValue);

  const openWeatherMapApiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY ?? "";
  const imageQuality = Number(process.env.NEXT_PUBLIC_IMAGE_QUALITY ?? 30);
  const searchHistoryLimit = Number(process.env.NEXT_PUBLIC_SEARCH_HISTORY_LIMIT ?? 10);
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "";

  const envValue = {
    openWeatherMapApiKey,
    imageQuality,
    searchHistoryLimit
  };

  const page = (
    <EnvProvider value={envValue}>
      <HomeContent {...{ loadShortcuts }} />
      <GoogleAnalytics gaId={gaId} />
    </EnvProvider>
  );

  return page;
}
