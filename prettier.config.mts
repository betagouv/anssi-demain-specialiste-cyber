import sveltePlugin from 'prettier-plugin-svelte';
import { type Config } from 'prettier';

const config: Config = {
  singleQuote: true,
  trailingComma: 'es5',
  plugins: [sveltePlugin],
};

export default config;
