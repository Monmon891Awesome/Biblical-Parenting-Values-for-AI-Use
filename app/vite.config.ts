import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Firstlight PWA config. Installable + offline-first per web-app-prd.md §13.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['firstlight.svg'],
      manifest: {
        name: 'Firstlight — Biblical Parenting Guide',
        short_name: 'Firstlight',
        description: 'New mercies for new parents. A gentle, Scripture-rooted guide.',
        theme_color: '#FAF6EF',
        background_color: '#FAF6EF',
        display: 'standalone',
        icons: [
          { src: 'firstlight.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      }
    })
  ]
});
