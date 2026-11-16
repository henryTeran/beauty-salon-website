import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  // BASE_PATH=/sous-dossier/ pour un déploiement dans un sous-dossier (ex. GitHub Pages)
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : { output: { manualChunks: { motion: ['framer-motion'], react: ['react', 'react-dom', 'react-router-dom'] } } },
  },
}));
