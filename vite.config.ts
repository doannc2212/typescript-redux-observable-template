import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],

  server: {
    open: false,
    port: 4000,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@lib',
        replacement: fileURLToPath(new URL('./src/lib', import.meta.url)),
      },
    ],
  },
});
