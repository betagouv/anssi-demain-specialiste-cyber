import express from 'express';
import fs from 'fs';
import { join } from 'path';

export interface MoteurDeRendu {
  rends: (
    reponse: express.Response,
    vue: string,
    options: object,
    callback?: (err: Error | null, html?: string) => void
  ) => void;
}

export const moteurDeRenduExpress = (): MoteurDeRendu => {
  const manifestPath = join(process.cwd(), '../front/dist/.vite/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  const manifestOptions = {
    dsc: manifest['src/index.ts'].file,
    style: manifest['style.css'].file,
  };

  return {
    rends(reponse, vue, options) {
      reponse.render(vue, { ...options, ...manifestOptions });
    },
  };
};
