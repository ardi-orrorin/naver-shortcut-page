import { NextRequest, NextResponse } from "next/server";
import { OpenWeatherMapI, OwmGeoLocationI } from "../../_utils/types/weather-type";

const headers = {
  "Content-Type": "application/json"
} as const;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;

  const lat = searchParams.get("lat");
  const long = searchParams.get("long");

  if (!apiKey) {
    return new NextResponse(JSON.stringify({ error: "OpenWeatherMap API key is not found" }), {
      status: 400,
      headers
    });
  }

  if (!lat || !long) {
    return new NextResponse(JSON.stringify({ error: "Missing required parameters" }), {
      status: 400,
      headers
    });
  }

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=kr&appid=${apiKey}&units=metric`
    );
    const weatherData = (await weatherRes.json()) as OpenWeatherMapI;

    const cityRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${apiKey}&lang=kr`
    );

    const cityData = (await cityRes.json()) as OwmGeoLocationI[];

    return new NextResponse(JSON.stringify({ weatherData, cityData }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch weather data" }), {
      status: 500,
      headers
    });
  }
}
