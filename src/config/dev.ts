import type { AppConfig } from '../types/appConfig';

export const devConfig: AppConfig = {
  env: 'dev',
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000/ws',
  appName: 'React App (DEV)',
  version: '1.0.0-dev',
  timeout: 30000,
  mockEnabled: true,
  enableDevTools: true,
};