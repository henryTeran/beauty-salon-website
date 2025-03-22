import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.url, 'VITE_');

  return {
    plugins: [react()],
    define: {
      'import.meta.env': JSON.stringify(env),
    },
  };
})
