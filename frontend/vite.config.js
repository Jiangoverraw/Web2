import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, 
    proxy: {
      '/api': {
        target: 'http://localhost:4311',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
