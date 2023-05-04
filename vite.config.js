import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    //配置路径别名
    alias: {
      '@' : path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3002, //端口号为
    open: false, //是否在默认浏览器中自动打开该地址
    proxy: { //使用代理
      '/api': { //当有 /api开头的地址是，代理到target地址
        target: 'http://127.0.0.1:3001', // 需要跨域代理的本地路径
        changeOrigin: true, //是否改变请求源头
      }
    }
  }
})
