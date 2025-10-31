import { Request, Response, Router } from 'express';

import { ConfigurationServeur } from './configurationServeur';
import { filetRouteAsynchrone } from './middleware';

export const ressourceRessourceCyber = ({
  entrepotRessourcesCyber,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get(
    '/',
    filetRouteAsynchrone(async (_requete: Request, reponse: Response) => {
      const ressources = (await entrepotRessourcesCyber?.tous()) ?? [];
      reponse.send(ressources);
    }),
  );

  return routeur;
};
