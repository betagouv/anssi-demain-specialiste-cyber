import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
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
        // exporte tous les WebComponents dans le script dsc.js
        dsc: 'src/index.ts',
      },
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    emptyOutDir: true,
    sourcemap: true,
  },
  define: {
    'process.env.NODE_ENV': "'production'",
  },
});
