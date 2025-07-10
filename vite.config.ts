import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import path from 'path';

import rollupOptions from './rollup.config';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin(),
    dts({ insertTypesEntry: true, outDir: 'dist/types' }),
  ],
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UIUX',
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : format}`,
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
