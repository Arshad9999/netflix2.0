import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 3000 },
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.js'], include: ['src/**/*.test.{js,jsx}'] },
});
