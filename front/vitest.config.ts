import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/vitest-setup.ts',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    alias: {
      '@style': path.join(__dirname, 'src/style'),
    },
  },
});
