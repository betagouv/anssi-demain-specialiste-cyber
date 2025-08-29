import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
      preprocess: vitePreprocess(),
    }),
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        // exporte tous les WebComponents dans le script index.js
        index: 'src/index.ts',
        // exporte chaque WebComponents dans son propre script
        ...Object.fromEntries(
          fs
            .readdirSync(resolve(__dirname, 'src'))
            .filter((file) => file.endsWith('.svelte'))
            .map((file) => [
              file.replace('.svelte', '').toLowerCase(),
              resolve(__dirname, 'src', file),
            ])
        ),
      },
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].js',
      },
    },
    emptyOutDir: true,
    sourcemap: true,
  },
  define: {
    'process.env.NODE_ENV': "'production'",
  },
});
