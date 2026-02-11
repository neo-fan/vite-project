export interface AppConfig {
  env: 'dev' | 'prod';
  apiUrl: string;
  wsUrl?: string;
  appName: string;
  version: string;
  timeout: number;
  mockEnabled: boolean;
  enableDevTools: boolean;
  sentryDsn?: string;
  weatherApiKey?: string;
}