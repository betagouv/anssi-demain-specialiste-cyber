import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import { dirname, relative, resolve } from 'path';
import * as Vite from 'vite';
import { defineConfig, Plugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
      preprocess: vitePreprocess(),
    }),
    moveHtmlPlugin(),
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        // exporte tous les WebComponents dans le script dsc.js
        dsc: 'src/index.ts',
      },
      output: {
        entryFileNames: '[name]/index.html',
      },
    },
    emptyOutDir: true,
    sourcemap: true,
  },
  define: {
    'process.env.NODE_ENV': "'production'",
  },
});

// Plugin to move HTML files after build
function moveHtmlPlugin(): Plugin {
  const srcPages = 'src/pages';
  const srcPagesDir = resolve(__dirname, srcPages);

  // Recursively find all HTML files under src/pages
  function findHtmlFiles(dir: string) {
    let results: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(findHtmlFiles(fullPath));
      } else if (entry.isFile() && entry.name === 'index.html') {
        results.push(fullPath);
      }
    }
    return results;
  }

  const htmlFiles = findHtmlFiles(srcPagesDir);

  // Map input keys to relative path from src/pages (e.g. catalogue/index for src/pages/catalogue/index.html)
  const input = Object.fromEntries(
    htmlFiles.map((file) => {
      const rel = relative(srcPagesDir, file); // e.g. catalogue/index.html
      const name = dirname(rel); // e.g. catalogue
      return [name, file];
    })
  );

  return {
    name: 'move-html-plugin',
    config(config: Vite.UserConfig) {
      let rollupOptionsInput = config.build?.rollupOptions?.input ?? {};
      rollupOptionsInput = {
        ...(rollupOptionsInput as Record<string, string>),
        ...input,
      };
      config.build = {
        rollupOptions: {
          input: rollupOptionsInput,
        },
      };
    },
    closeBundle() {
      for (const name of Object.keys(input)) {
        const from = resolve(__dirname, 'dist', srcPages, name, 'index.html');
        const toDir = resolve(__dirname, 'dist', name);
        const to = resolve(toDir, 'index.html');
        if (fs.existsSync(from)) {
          fs.mkdirSync(toDir, { recursive: true });
          fs.renameSync(from, to);
          fs.rmSync(resolve(__dirname, 'dist', srcPages, name), {
            recursive: true,
            force: true,
          });
        }
      }
      const srcPagesDir = resolve(__dirname, 'dist', srcPages);
      if (fs.existsSync(srcPagesDir)) {
        fs.rmSync(srcPagesDir, { recursive: true, force: true });
      }
      const srcDir = resolve(__dirname, 'dist', 'src');
      if (fs.existsSync(srcDir)) {
        fs.rmSync(srcDir, { recursive: true, force: true });
      }
    },
  };
}
