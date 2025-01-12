import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist', // Ensure this matches the dist folder in your vercel.json
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://the-skinner-front-back.vercel.app', // Backend local server
        changeOrigin: true,
      },
    },
  },
});
