import type { AppConfig } from '../types/appConfig';
import { devConfig } from './dev';
import { prodConfig } from './prod';

// ✅ 使用 Vite 的 import.meta.env（推荐）
const currentEnv = import.meta.env?.VITE_APP_ENV || 'dev';

// 根据环境选择配置
const configMap: Record<string, AppConfig> = {
  dev: devConfig,
  prod: prodConfig,
};

// 获取当前环境配置
export const config: AppConfig = configMap[currentEnv] || devConfig;

// 导出环境判断工具函数
export const isDev = () => config.env === 'dev';
export const isProd = () => config.env === 'prod';

// 导出配置（默认导出）
export default config;