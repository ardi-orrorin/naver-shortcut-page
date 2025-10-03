"use client";

import { useEffect, useMemo, useState } from "react";
import { LinkOpenPreferenceProvider, useLinkOpenPreference } from "../_utils/contexts/link-open-preference-context";
import BookmarkHelpModal from "./bookmark-help-modal";
import MoreShortcut from "./more-shortcut";
import SearchBox from "./search-box";
import SelectedShortcuts from "./selected-shortcuts";
import Title from "./title";
import Weather from "./weather";

type HomeContentProps = {
  loadShortcuts: string[];
};

function LinkOpenToggle() {
  const { isNewTab, toggle, initialized } = useLinkOpenPreference();

  if (!initialized) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isNewTab}
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors ${
        isNewTab
          ? "border-[#03c75a] bg-[#03c75a]/10 text-[#03c75a]"
          : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
      }`}>
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: isNewTab ? "#03c75a" : "#9ca3af" }}
      />
      {isNewTab ? "새 탭으로 열기" : "현재 탭에서 열기"}
    </button>
  );
}

function HomeContentInner({ loadShortcuts }: HomeContentProps) {
  const weatherApiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;
  const [coords, setCoords] = useState<{ lat: string; long: string } | null>(null);
  const [locationAllowed, setLocationAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!weatherApiKey) {
      setLocationAllowed(false);
      return;
    }

    // if (!("geolocation" in navigator)) {
    //   setLocationAllowed(false);
    //   return;
    // }

    // console.log("weatherApiKey", weatherApiKey);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude.toFixed(2),
          long: position.coords.longitude.toFixed(2)
        });
        setLocationAllowed(true);
      },
      () => {
        setCoords(null);
        setLocationAllowed(false);
      }
    );
  }, [weatherApiKey]);

  const shouldShowWeather = useMemo(() => {
    if (!weatherApiKey) return false;
    if (!coords) return false;
    if (locationAllowed === false) return false;
    return true;
  }, [coords, locationAllowed, weatherApiKey]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 py-16">
      <div className="absolute left-4 top-4 z-50 sm:left-6 sm:top-6">
        <LinkOpenToggle />
      </div>
      <BookmarkHelpModal />
      <main className="flex w-full max-w-3xl flex-col items-center gap-10 px-4 text-center sm:text-left">
        <div
          className={`flex w-full flex-col items-center gap-8 sm:flex-row sm:flex-nowrap ${
            shouldShowWeather ? "sm:items-start sm:justify-between" : "sm:items-center sm:justify-center"
          }`}>
          <Title />
          {shouldShowWeather && coords && weatherApiKey && (
            <Weather lat={coords.lat} long={coords.long} apiKey={weatherApiKey} />
          )}
        </div>
        <div className="flex w-full flex-col items-center gap-6">
          <SearchBox />
          {loadShortcuts.length > 0 && <SelectedShortcuts ids={loadShortcuts} />}
          <MoreShortcut loadShortcuts={loadShortcuts} />
        </div>
      </main>
    </div>
  );
}

export default function HomeContent(props: HomeContentProps) {
  return (
    <LinkOpenPreferenceProvider>
      <HomeContentInner {...props} />
    </LinkOpenPreferenceProvider>
  );
}
