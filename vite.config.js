import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import dotenv from 'dotenv'
import { generateDistFolderName } from './src/utils/sys'

// 加载 .env 文件
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // ElementPlus(),
    nodePolyfills(),
    // AutoImport({
    //   // imports: ['vue', 'vue-router'],
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   dts: false,
    //   // dirs: ['src'],
    //   extensions: ['vue'],
    //   resolvers: [ElementPlusResolver()]
    // }),
    visualizer({
      open: true,
      gzipSize: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
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
  // server: {
  //   proxy: {
  //     '^/api': {
  //       target: 'https://test-admin.chishine3d.com',
  //       changeOrigin: true,
  //       ws: true,
  //       rewrite: (path) => path.replace(new RegExp(`^/`), '')
  //       // only https
  //       // secure: false
  //     }
  //   }
  // },
  build: {
    outDir: generateDistFolderName(),
    minify: 'terser',
    chunkSizeWarningLimit: 600,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
