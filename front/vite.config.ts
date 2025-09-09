import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import * as Vite from 'vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: Vite.UserConfig) => ({
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
      preprocess: vitePreprocess(),
    }),
  ],
  build: {
    manifest: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        // exporte tous les WebComponents dans le script dsc.js
        dsc: 'src/index.ts',
      },
      output:
        mode === 'development'
          ? {
              entryFileNames: 'assets/[name].js',
              assetFileNames: 'assets/[name].[ext]',
            }
          : {
              entryFileNames: 'assets/[name].[hash].js',
              assetFileNames: 'assets/[name].[hash].[ext]',
            },
    },
    emptyOutDir: true,
    sourcemap: true,
  },
  define: {
    'process.env.NODE_ENV': "'production'",
  },
}));
