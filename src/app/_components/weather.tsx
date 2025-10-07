"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import weatherApi from "../_utils/apis/weather";
import { weatherFuncs } from "../_utils/funcs/weather-func";
import { Nullable } from "../_utils/types/common-type";
import { OpenWeatherMapI, OwmGeoLocationI } from "../_utils/types/weather-type";

type WeatherProps = {
  lat: string;
  long: string;
  apiKey: string;
};

const NAVER_WEATHER_URL = "https://weather.naver.com/";

export default function Weather({ lat, long, apiKey }: WeatherProps) {
  const [weather, setWeather] = useState<Nullable<OpenWeatherMapI>>(null);
  const [city, setCity] = useState<Nullable<OwmGeoLocationI>>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Nullable<Error>>(null);

  const {
    cityName,
    mainTemperature,
    feelsLike,
    description,
    iconCode,
    humidity,
    windSpeed,
    tempMin,
    tempMax,
    canRenderData
  } = weatherFuncs.convertToInfo({ weather, city, isLoading });

  useEffect(() => {
    if (!apiKey || !lat || !long) {
      return;
    }

    const getWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const weather = await weatherApi.getMap({ apiKey, lat, long });

        const city = await weatherApi.getCity({ apiKey, lat, long });

        setWeather(weather);
        setCity(city[0] ?? null);
      } catch (fetchError) {
        const normalizedMessage = (() => {
          if (fetchError instanceof Error) return fetchError.message;
          if (typeof fetchError === "string") return fetchError;

          try {
            return JSON.stringify(fetchError);
          } catch {
            return String(fetchError);
          }
        })();

        setError(new Error(`${normalizedMessage}`));
      } finally {
        setIsLoading(false);
      }
    };

    getWeather();
  }, [apiKey, lat, long]);

  const secondaryLine = useMemo(() => {
    if (!canRenderData) return "상세 정보를 불러오는 중";

    return (
      [feelsLike ? `체감 ${feelsLike}` : null, description || null].filter(Boolean).join(" · ") ||
      "상세 정보를 불러오는 중"
    );
  }, [canRenderData, description, feelsLike]);

  const tertiaryLine = useMemo(() => {
    if (!canRenderData) return "";

    return [
      tempMin ? `최저 ${tempMin}` : null,
      tempMax ? `최고 ${tempMax}` : null,
      humidity ? `습도 ${humidity}` : null,
      windSpeed ? `풍속 ${windSpeed}` : null
    ]
      .filter(Boolean)
      .join(" · ");
  }, [canRenderData, humidity, tempMax, tempMin, windSpeed]);

  if (error) {
    throw error;
  }
  return (
    <Link href={NAVER_WEATHER_URL} className="w-full px-4 text-left sm:w-auto sm:px-0">
      <div className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white/95 px-4 py-3 shadow-sm sm:w-auto sm:flex-shrink-0 sm:gap-4 sm:px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#03c75a]/10 sm:h-11 sm:w-11">
          {canRenderData && iconCode ? (
            <Image
              src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
              alt={description || "weather"}
              width={44}
              height={44}
              priority
            />
          ) : (
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-[#03c75a]">
            {isLoading ? (
              <span className="inline-block h-3 w-28 animate-pulse rounded bg-gray-200" />
            ) : (
              [cityName, typeof mainTemperature === "number" ? `${mainTemperature}°` : null].filter(Boolean).join(" · ")
            )}
          </p>
          <p className="mt-1 truncate text-sm font-medium text-gray-800">
            {isLoading ? <span className="inline-block h-4 w-28 animate-pulse rounded bg-gray-200" /> : secondaryLine}
          </p>
          {canRenderData && tertiaryLine && <p className="mt-1 truncate text-[12px] text-gray-500">{tertiaryLine}</p>}
        </div>
      </div>
    </Link>
  );
}
