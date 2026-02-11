import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // 注入环境变量到代码中
      'import.meta.env.VITE_APP_ENV': JSON.stringify(env.VITE_APP_ENV || 'dev'),
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'dev',
    },
    base: process.env.BASE_URL || '/',
  };
});