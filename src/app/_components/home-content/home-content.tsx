"use client";

import { useEnvContext } from "@/app/_utils/contexts/env-context";
import { BooleanOrNull, Nullable } from "@/app/_utils/types/common-type";
import { GeoLocationI } from "@/app/_utils/types/weather-type";
import { useEffect, useMemo, useState } from "react";
import { LinkOpenPreferenceProvider } from "../../_utils/contexts/link-open-preference-context";
import { SearchHistoryPreferenceProvider } from "../../_utils/contexts/search-history-preference-context";
import { SearchModeShortcutProvider } from "../../_utils/contexts/search-mode-shortcut-context";
import BookmarkHelpModal from "../bookmark-help-modal";
import MoreShortcut from "../more-shortcut";
import SearchBox from "../search-box/search-box";
import SelectedShortcuts from "../selected-shortcuts/selected-shortcuts";
import Title from "../title";
import Weather from "../weather";
import LinkOpenToggle from "./link-open-toggle";
import SearchHistoryAutoToggle from "./search-history-auto-toggle";

type HomeContentProps = {
  loadShortcuts: string[];
};

export default function HomeContent({ loadShortcuts }: HomeContentProps) {
  const [geoLocation, setGeoLocation] = useState<Nullable<GeoLocationI>>(null);
  const [locationAllowed, setLocationAllowed] = useState<BooleanOrNull>(null);
  const { openWeatherMapApiKey, imageQuality } = useEnvContext();

  const shouldShowWeather = useMemo(() => {
    if (!geoLocation) return false;
    if (locationAllowed === false) return false;
    return true;
  }, [geoLocation, locationAllowed]);

  useEffect(() => {
    if (!openWeatherMapApiKey) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation({
          lat: position.coords.latitude.toFixed(2),
          long: position.coords.longitude.toFixed(2)
        });
        setLocationAllowed(true);
      },
      () => {
        setGeoLocation(null);
        setLocationAllowed(false);
      }
    );
  }, [openWeatherMapApiKey]);

  return (
    <SearchHistoryPreferenceProvider>
      <LinkOpenPreferenceProvider>
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 py-16">
          <div className="absolute left-4 top-4 z-50 sm:left-6 sm:top-6">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:flex-wrap">
              <LinkOpenToggle />
              <SearchHistoryAutoToggle />
            </div>
          </div>
          <BookmarkHelpModal />
          <main className="flex w-full max-w-3xl flex-col items-center gap-10 px-4 text-center sm:text-left">
            <div
              className={`flex w-full flex-col items-center gap-8 sm:flex-row sm:flex-nowrap ${
                shouldShowWeather ? "sm:items-start sm:justify-between" : "sm:items-center sm:justify-center"
              }`}>
              <Title />
              {shouldShowWeather && geoLocation && <Weather {...geoLocation} />}
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <SearchModeShortcutProvider>
                <SearchBox />
              </SearchModeShortcutProvider>
              {loadShortcuts.length > 0 && <SelectedShortcuts {...{ ids: loadShortcuts, imageQuality }} />}
              <MoreShortcut {...{ loadShortcuts, imageQuality }} />
            </div>
          </main>
        </div>
      </LinkOpenPreferenceProvider>
    </SearchHistoryPreferenceProvider>
  );
}
