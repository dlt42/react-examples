import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // sourcemap: true,
    // manifest: true,
    outDir: 'build',
    assetsDir: 'static',
    minify: 'esbuild',
  },
});
