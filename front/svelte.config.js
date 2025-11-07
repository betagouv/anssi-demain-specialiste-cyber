import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  compilerOptions: { customElement: true },
  preprocess: [
    vitePreprocess({
      script: true,
      style: {
        resolve: {
          alias: {
            '@style': join(__dirname, 'src/style'),
          },
        },
      },
    }),
  ],
};

export default config;
