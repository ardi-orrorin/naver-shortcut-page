import { OpenWeatherMapI, OwmGeoLocationI } from "../types/weather-type";

type WeatherApiParams = {
  apiKey: string;
  lat: string;
  long: string;
};

const getMap = async ({ apiKey, lat, long }: WeatherApiParams) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=kr&appid=${apiKey}&units=metric`
  );
  return (await res.json()) as OpenWeatherMapI;
};

const getCity = async ({ apiKey, lat, long }: WeatherApiParams) => {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${apiKey}&lang=kr`
  );
  return (await res.json()) as OwmGeoLocationI[];
};

const weatherApi = {
  getMap,
  getCity
};

export default weatherApi;
