import { weatherAxios } from "../lib/weatherAxios";
import type {
  WeatherQueryParams,
  WeatherResponse,
  CityLookupResponse,
} from "../types/weather";

export const getWeatherNow = async (
  params: WeatherQueryParams,
): Promise<WeatherResponse> => {
  return weatherAxios.get("/v7/weather/now", {
    params: { location: params.location },
  });
};

export const getGeo = async (location: string): Promise<CityLookupResponse> => {
  return weatherAxios.get("/geo/v2/city/lookup", {
    params: { location: location },
  });
};
