import { defineConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ preprocess: vitePreprocess() })],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        catalogue: "src/main-catalogue.ts",
      },
    },
    emptyOutDir: true,
    sourcemap: true,
  },
  define: {
    "process.env.NODE_ENV": "'production'",
  },
});
