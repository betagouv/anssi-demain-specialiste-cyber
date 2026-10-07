import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as Vite from 'vite';
import { createLogger, defineConfig } from 'vite';
import { injecteNonce } from './src/utils/injecteNonce.plugin.js';

const loggerPersonnalise = createLogger();
const loggerWarnOnce = loggerPersonnalise.warnOnce;

loggerPersonnalise.warnOnce = (msg, options) => {
  const regexp =
    /assets\/.* referenced in \/assets\/.* didn't resolve at build time, it will remain unchanged to be resolved at runtime/;
  if (msg.match(regexp)) return;

  loggerWarnOnce(msg, options);
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: Vite.UserConfig) => ({
  resolve: {
    alias: {
      '@style': path.join(__dirname, 'src/style'),
    },
  },
  plugins: [svelte(), injecteNonce()],
  build: {
    manifest: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        // exporte tous les WebComponents dans le script dsc.js
        dsc: 'src/index.ts',
        sentry: 'src/sentry.ts',
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
  customLogger: loggerPersonnalise,
}));
