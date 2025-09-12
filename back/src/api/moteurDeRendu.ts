import { randomBytes } from 'crypto';
import express from 'express';
import fs from 'fs';
import { join } from 'path';

export interface MoteurDeRendu {
  rends: (reponse: express.Response, vue: string, options?: object) => void;
}

export const moteurDeRenduExpress = (): MoteurDeRendu => {
  const manifestPath = join(process.cwd(), '../front/dist/.vite/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  const manifestOptions = {
    dsc: manifest['src/index.ts'].file,
    style: manifest['style.css'].file,
  };

  const nonce = randomBytes(24).toString('base64');
  return {
    rends(reponse, vue, options) {
      options = { ...options, ...manifestOptions, nonce };
      reponse.render(vue, options, (err, html) => {
        if (err.message.startsWith('Failed to lookup view')) {
          return reponse.status(404).render('404', options);
        }
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          return reponse.status(500).render('500', options);
        }
        return reponse.send(html);
      });
    },
  };
};
