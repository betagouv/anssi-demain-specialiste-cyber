import { Router } from 'express';
import { FamilleDeMétier } from '../metier/familleDeMetier';
import { ConfigurationServeur } from './configurationServeur';
import { filetRouteAsynchrone } from './middleware';

const slugifie = (code: string): string =>
  code
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const ressourceFamilleDeMétier = ({ entrepôtFamillesDeMétier }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get(
    '/:code',
    filetRouteAsynchrone(async (requête, réponse) => {
      const familles = await entrepôtFamillesDeMétier.tous();
      const famille = familles.find((f) => slugifie(f.code) === requête.params.code);
      if (!famille) {
        return réponse.sendStatus(404);
      }
      return réponse.send(familleDeMétierPrésentation(famille));
    }),
  );

  return routeur;
};

export const familleDeMétierPrésentation = (famille: FamilleDeMétier) => ({
  ...famille,
  profils: famille.profils.map((p) => ({ ...p, idInterne: undefined })),
});
