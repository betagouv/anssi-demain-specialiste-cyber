import { defineConfig } from 'vitest/config';
export default defineConfig({
  root: './src',
  test: {
    include: ['./**/*.{test,spec}.ts'],
    root: './tests',
  },
});
