import { Request, Response, Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { filetRouteAsynchrone } from './middleware';

export const ressourceMetiers = ({ entrepotMetier }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get(
    '/',
    filetRouteAsynchrone(async (_requete: Request, reponse: Response) => {
      const metiers = await entrepotMetier.tous();
      reponse.send(metiers);
    }),
  );

  return routeur;
};
