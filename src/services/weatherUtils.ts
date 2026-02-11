import { WEATHER_ICONS } from "../types/weather";

// 格式化函数
export const formatTemperature = (temp: string): string => `${temp}°C`;

export const formatWind = (windDir: string, windScale: string): string =>
  `${windDir} ${windScale}级`;

export const formatHumidity = (humidity: string): string => `${humidity}%`;

export const getWeatherIcon = (iconCode: string): string =>
  WEATHER_ICONS[iconCode] || "❓";

// 判断白天/黑夜
export const isDayTime = (obsTime: string): boolean => {
  try {
    const hour = new Date(obsTime).getHours();
    return hour >= 6 && hour < 18;
  } catch {
    return true;
  }
};

// 背景颜色
export const getWeatherBgColor = (iconCode: string, isDay: boolean): string => {
  const type = iconCode.charAt(0);
  return isDay
    ? type === "1"
      ? "bg-gradient-to-br from-blue-400 to-cyan-500"
      : type === "3"
        ? "bg-gradient-to-br from-blue-500 to-cyan-600"
        : type === "4"
          ? "bg-gradient-to-br from-blue-400 to-indigo-600"
          : "bg-gradient-to-br from-gray-300 to-gray-500"
    : type === "1"
      ? "bg-gradient-to-br from-indigo-900 to-purple-900"
      : type === "3"
        ? "bg-gradient-to-br from-blue-900 to-cyan-900"
        : type === "4"
          ? "bg-gradient-to-br from-indigo-900 to-blue-900"
          : "bg-gradient-to-br from-gray-800 to-gray-900";
};
