import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@lxjx/utils': path.resolve(__dirname, '../src'),
    },
  },
  build: {
    outDir: 'example',
  }
});
