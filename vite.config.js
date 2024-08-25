import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker()
  ],
  server: {
    port: 3000
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    postcss: {},
  }
})
