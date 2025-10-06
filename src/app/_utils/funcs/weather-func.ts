import { Nullable } from "../types/common-type";
import { OpenWeatherMapI, OwmGeoLocationI, WeatherInfoI } from "../types/weather-type";

const convertToInfo = ({
  weather,
  city,
  isLoading
}: {
  weather: Nullable<OpenWeatherMapI>;
  city: Nullable<OwmGeoLocationI>;
  isLoading: boolean;
}): WeatherInfoI => {
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
  const canRenderData = hasWeatherData && !isLoading;

  return {
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
  };
};

const formatTemperature = (value?: number) => (typeof value === "number" ? `${Math.round(value)}°` : "--°");
const toIntegerTemperature = (value?: number) => (typeof value === "number" ? Math.round(value) : null);

export const weatherFuncs = {
  convertToInfo,
  formatTemperature,
  toIntegerTemperature
};
