"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { OpenWeatherMapI, OwmGeoLocationI } from "../_utils/types/weather-type";

type WeatherProps = {
  lat: string;
  long: string;
  apiKey?: string;
};

const WEATHER_URL = "https://weather.naver.com/";

const formatTemperature = (value?: number) => (typeof value === "number" ? `${Math.round(value)}°` : "--°");
const toIntegerTemperature = (value?: number) => (typeof value === "number" ? Math.round(value) : null);

export default function Weather({ lat, long, apiKey }: WeatherProps) {
  const weatherApiKey = apiKey ?? process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;
  const [weather, setWeather] = useState<OpenWeatherMapI | null>(null);
  const [city, setCity] = useState<OwmGeoLocationI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!weatherApiKey) {
      setIsLoading(false);
      return;
    }
    if (!lat || !long) {
      return;
    }

    let isMounted = true;

    const getWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=kr&appid=${weatherApiKey}&units=metric`
        );
        const data = (await response.json()) as OpenWeatherMapI;

        const cityResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${weatherApiKey}&lang=kr`
        );
        const cityData = (await cityResponse.json()) as OwmGeoLocationI[];

        if (!isMounted) return;

        setWeather(data);
        setCity(Array.isArray(cityData) ? cityData[0] ?? null : null);
      } catch (fetchError) {
        if (!isMounted) return;
        setError("날씨 정보를 가져오는데 실패했습니다.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getWeather();

    return () => {
      isMounted = false;
    };
  }, [lat, long, weatherApiKey]);

  const hasWeatherData = Boolean(weather);
  const currentWeather = weather?.weather?.[0];
  const cityName = city?.local_names?.ko ?? city?.name ?? "현재 위치";
  const mainTemperature = toIntegerTemperature(weather?.main?.temp);
  const feelsLike = typeof weather?.main?.feels_like === "number" ? formatTemperature(weather.main.feels_like) : null;
  const description = currentWeather?.description ?? "";
  const iconCode = currentWeather?.icon;
  const humidity = typeof weather?.main?.humidity === "number" ? `${weather.main.humidity}%` : null;
  const windSpeed = typeof weather?.wind?.speed === "number" ? `${Math.round(weather.wind.speed)} m/s` : null;
  const tempMin = formatTemperature(weather?.main?.temp_min);
  const tempMax = formatTemperature(weather?.main?.temp_max);
  const canRenderData = hasWeatherData && !isLoading && !error;

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

  return (
    <Link href={WEATHER_URL} className="w-full px-4 text-left sm:w-auto sm:px-0">
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

      {error && !isLoading && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </Link>
  );
}
