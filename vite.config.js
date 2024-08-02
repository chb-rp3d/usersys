import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
