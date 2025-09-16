import express from 'express';
import fs from 'fs';
import { join } from 'path';

export interface MoteurDeRendu {
  rends: (reponse: express.Response, vue: string, options?: object) => void;
}

type FournisseurDeChemins = () => { dsc: string; style: string };

const lisLesCheminsDesFichiersGeneresParLeFront: FournisseurDeChemins = () => {
  const cheminVersLeFichierManifeste = join(
    process.cwd(),
    '../front/dist/.vite/manifest.json',
  );
  const manifeste = JSON.parse(
    fs.readFileSync(cheminVersLeFichierManifeste, 'utf-8'),
  );
  return {
    dsc: manifeste['src/index.ts'].file,
    style: manifeste['style.css'].file,
  };
};

export const moteurDeRenduExpress = (
  fournisseurDeChemins: FournisseurDeChemins = lisLesCheminsDesFichiersGeneresParLeFront,
): MoteurDeRendu => {
  return {
    rends(reponse, vue, options) {
      const optionsAvecManifesteEtNonce = {
        ...options,
        ...fournisseurDeChemins(),
        nonce: reponse.locals.nonce,
      };
      reponse.render(vue, optionsAvecManifesteEtNonce);
    },
  };
};
