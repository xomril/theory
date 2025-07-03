import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/driving-theory-test/', // 👈 שים כאן את שם הריפו שלך
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
