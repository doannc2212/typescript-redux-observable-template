import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
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
        find: '@shared',
        replacement: fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
      {
        find: '@cmp',
        replacement: fileURLToPath(new URL('./src/shared/cmp', import.meta.url)),
      },
      {
        find: '@use',
        replacement: fileURLToPath(new URL('./src/shared/use', import.meta.url)),
      },
      {
        find: '@lookup',
        replacement: fileURLToPath(new URL('./src/shared/lookup', import.meta.url)),
      },
    ],
  },
});
