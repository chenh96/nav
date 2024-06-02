import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  publicDir: 'public',
  plugins: [react()],
  base: './',
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://nav.chenh.tech/',
        // target: 'http://127.0.0.1:8888/',
        // rewrite: (path) => path.replace(/^\/api\//, ''),
        changeOrigin: true,
      },
    },
  },
})
