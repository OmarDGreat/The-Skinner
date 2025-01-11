import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true, // Enable HTTPS
    port: 5173,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist', // Ensure build output is placed in the 'dist' folder
  },
});
