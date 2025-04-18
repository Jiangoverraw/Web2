import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Đảm bảo frontend chạy trên cổng này
    proxy: {
      '/api': {
        target: 'http://localhost:4311', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
