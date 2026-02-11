import type { AppConfig } from '../types/appConfig';

export const prodConfig: AppConfig = {
  env: 'prod',
  apiUrl: 'https://api.yourdomain.com',
  wsUrl: 'wss://api.yourdomain.com/ws',
  appName: 'React App',
  version: '1.0.0',
  timeout: 10000,
  mockEnabled: false,
  enableDevTools: false,
  sentryDsn: 'https://your-sentry-dsn@o00000.ingest.sentry.io/00000',
};