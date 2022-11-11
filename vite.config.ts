import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    port: 4000,
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/index.scss";`,
      },
    },
  },
});
