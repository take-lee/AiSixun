import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 【新增】这一行非常重要！必须与你的仓库名称一致
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
// 由于你使用了 Tailwind CSS，建议增加以下配置防止样式丢失
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'external-globals',
          Once(root, { result }) {
            result.messages = result.messages.filter(
              (m) => m.type !== 'asset'
            );
          },
        },
      ],
    },
  },
});