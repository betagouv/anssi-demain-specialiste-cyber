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
        catalogue: 'src/main-catalogue.ts',
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
