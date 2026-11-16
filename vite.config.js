import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : { output: { manualChunks: { motion: ['framer-motion'], react: ['react', 'react-dom', 'react-router-dom'] } } },
  },
}));
