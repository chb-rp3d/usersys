import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), ElementPlus()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    },
    // preprocessorOptions: {
    //   // 全局引入了 scss 的文件
    //   scss: {
    //     additionalData: `
    //     @use "@/assets/styles/light.scss" as *;
    //     @use "@/assets/styles/dark.scss" as *;
    //   `,
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://39.105.147.247:20000',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/api`), '')
        // only https
        // secure: false
      }
    }
  }
})
