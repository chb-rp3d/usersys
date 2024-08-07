import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://39.105.147.247:20000',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
        // only https
        // secure: false
      },
    }
  },
})
