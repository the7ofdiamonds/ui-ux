import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import path from 'path';

import rollupOptions from './rollup.config';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true, outDir: 'dist/types' }),
  ],
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UIUX',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: rollupOptions,
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
