import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
    }),
    svelteTesting(),
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
