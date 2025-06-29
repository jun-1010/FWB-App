import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'マネコネ',
        short_name: 'マネコネ',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0a8a70',
        description: '家計と未来がつながるサービス',
        icons: [
          {
            src: 'favicons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
