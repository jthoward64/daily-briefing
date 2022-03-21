export interface WeatherApiRoot {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: HourlyWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export interface HourlyWeather {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  pop?: number;
  snow?: Snow;
  rain?: Rain;
}

export interface Snow {
  "1h"?: number;
}

export interface Rain {
  "1h"?: number;
}

// https://openweathermap.org/weather-conditions
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: DaytimeTemps;
  feels_like: DaytimeFeelsLikeTemps;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  snow?: number;
  rain?: number;
  uvi: number;
}

export interface DaytimeFeelsLikeTemps {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DaytimeTemps {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
