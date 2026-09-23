import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoHead } from './seo.config.js'

const seo = () => ({
  name: 'hotel-seo-head',
  transformIndexHtml: (html) => html.replace('<!--seo-head-->', seoHead()),
})

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), seo()],
  build: {
    target: 'es2020',
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              react: ['react', 'react-dom'],
              motion: ['framer-motion'],
            },
          },
        },
  },
}))
