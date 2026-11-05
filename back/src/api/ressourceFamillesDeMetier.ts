import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { filetRouteAsynchrone } from './middleware';

const slugifie = (code: string): string =>
  code
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const ressourceFamillesDeMétier = ({ entrepôtFamillesDeMétier }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (_requête, réponse) => {
    const familles = await entrepôtFamillesDeMétier.tous();
    réponse.send(familles);
  });

  routeur.get(
    '/:code',
    filetRouteAsynchrone(async (requête, réponse) => {
      const familles = await entrepôtFamillesDeMétier.tous();
      const famille = familles.find((f) => slugifie(f.code) === requête.params.code);
      if (!famille) {
        return réponse.sendStatus(404);
      }
      return réponse.send(famille);
    }),
  );

  return routeur;
};
