import axios, { type AxiosInstance, AxiosError } from "axios";
import config from "../config/env";

// 天气 API 配置
const WEATHER_BASE_URL = "https://nf49ve7xfw.re.qweatherapi.com";
const API_KEY =
  import.meta.env.VITE_WEATHER_API_KEY || config.weatherApiKey || "";

// 创建天气专用 Axios 实例
export const weatherAxios: AxiosInstance = axios.create({
  baseURL: WEATHER_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========== 统一拦截器 ==========
weatherAxios.interceptors.request.use(
  (config) => {
    // 自动添加 API Key
    config.params = {
      ...config.params,
      key: API_KEY,
    };

    return config;
  },
  (error) => Promise.reject(error),
);

weatherAxios.interceptors.response.use(
  (response) => {
    // 统一处理响应
    if (response.data?.code === "200") {
      return response.data; // 成功
    } else {
      // 业务错误
      const errorMsg = response.data?.message || "天气数据获取失败";
      return Promise.reject(new Error(errorMsg));
    }
  },
  (error: AxiosError) => {
    let message = "天气服务请求失败";

    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = "API 认证失败";
          break;
        case 404:
          message = "接口不存在";
          break;
        case 429:
          message = "请求过于频繁";
          break;
        case 500:
        case 502:
        case 503:
          message = "服务暂时不可用";
          break;
      }
    } else if (error.code === "ECONNABORTED") {
      message = "请求超时";
    } else if (!navigator.onLine) {
      message = "网络连接已断开";
    }
    console.error("🌤️ 天气请求错误:", message);
    return Promise.reject(error);
  },
);
