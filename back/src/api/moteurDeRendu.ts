import express from 'express';
import fs from 'fs';
import { join } from 'path';
import { adaptateurEnvironnement } from '../infra/adaptateurEnvironnement';
import path from 'node:path';

const TITRE_DSC_SECABLE = 'Demain\u200bSpécialiste\u200bCyber';

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
  const packageJsonFront = JSON.parse(
    fs.readFileSync(path.resolve('../front/package.json'), 'utf-8'),
  );
  const { devDependencies } = packageJsonFront;
  const versionUIKit = devDependencies['@lab-anssi/ui-kit'].replace('~', '');
  return {
    rends(reponse, vue, options) {
      const matomo = adaptateurEnvironnement.matomo();
      const constantesPUG = {
        titreDSC: TITRE_DSC_SECABLE,
        versionUIKit,
      };
      const optionsAvecManifesteEtNonce = {
        ...options,
        ...fournisseurDeChemins(),
        nonce: reponse.locals.nonce,
      };
      reponse.render(vue, {
        ...optionsAvecManifesteEtNonce,
        ...constantesPUG,
        ...(matomo && { matomo }),
      });
    },
  };
};
