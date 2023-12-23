import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-18-222-23-230.us-east-2.compute.amazonaws.com:1024',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api2': {
        target: 'http://ec2-3-129-21-121.us-east-2.compute.amazonaws.com:1024',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, ''),
      },
      
    },
},
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
