import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
  publicDir: 'public',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '导航',
        short_name: '导航',
        description: '导航',
        lang: 'zh-cmn-Hans',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
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
