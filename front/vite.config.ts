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
    injecteNonce(),
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

const injecteNonceWebcomponents = (code: string) => {
  let codeAvecNonce = `const dscNonce = document.currentScript?.nonce;\n${code}`;
  codeAvecNonce = codeAvecNonce
    .replace(
      /const (.)\s*=\s*.\(["']style["']\);/gm,
      (match, nomVariable) => `${match}${nomVariable}.nonce=dscNonce;`,
    )
    .replace(
      /const (.)\s*=\s*document\.createElement\(["']style["']\);/gm,
      (match, nomVariable) => `${match}${nomVariable}.nonce=dscNonce;`,
    );

  return codeAvecNonce;
};

function injecteNonce(): Vite.Plugin {
  return {
    name: 'injecte-nonce',
    enforce: 'post',
    generateBundle(_options, bundle) {
      // eslint-disable-next-line no-console
      console.log('📝 Ajout de la gestion du Nonce');

      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk' && file.code) {
          // Remplace `const a = u("style");`
          // par `const a = u("style");a.nonce=nonce;`
          file.code = injecteNonceWebcomponents(file.code);
        }
      }

      // eslint-disable-next-line no-console
      console.log('✅');
    },
  };
}
