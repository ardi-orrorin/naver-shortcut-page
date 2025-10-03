export interface OpenWeatherMapI {
  coord: {
    lon: number; // 경도
    lat: number; // 위도
  };
  weather: {
    id: number; // 날씨 코드
    main: string; // 날씨 그룹 (Clouds, Rain 등)
    description: string; // 구체적인 설명
    icon: string; // 아이콘 코드
  }[];
  base: string; // 관측 기반 정보
  main: {
    temp: number; // 현재 온도
    feels_like: number; // 체감 온도
    temp_min: number; // 최저 온도
    temp_max: number; // 최고 온도
    pressure: number; // 기압 (hPa)
    humidity: number; // 습도 (%)
    sea_level?: number; // (옵션) 해수면 기압
    grnd_level?: number; // (옵션) 지상 기압
  };
  visibility: number; // 가시 거리 (m)
  wind: {
    speed: number; // 풍속 (m/s)
    deg: number; // 풍향 (0~360)
    gust?: number; // (옵션) 돌풍 속도
  };
  clouds: {
    all: number; // 구름량 (%)
  };
  dt: number; // 데이터 계산 시간 (Unix timestamp)
  sys: {
    country: string; // 국가 코드
    sunrise: number; // 일출 시간 (Unix timestamp)
    sunset: number; // 일몰 시간 (Unix timestamp)
  };
  timezone: number; // UTC offset (초)
  id: number; // 도시 ID
  name: string; // 도시 이름
  cod: number; // 응답 코드
}

export interface OwmGeoLocationI {
  name: string;

  local_names?: {
    [langCode: string]: string;
  };
  lat: number;

  lon: number;

  country: string;

  state?: string;
}
