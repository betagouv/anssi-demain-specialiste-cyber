import { ConfigurationServeur } from './configurationServeur';
import { Request, Response, Router } from 'express';
import { filetRouteAsynchrone } from './middleware';

export const ressourceMetier = ({ entrepotMetier }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get(
    '/:id',
    filetRouteAsynchrone(async (requete: Request, reponse: Response) => {
      const metier = await entrepotMetier.parIdentifiant(
        Number(requete.params.id),
      );
      if (!metier) {
        return reponse.sendStatus(404);
      }
      return reponse.send(metier);
    }),
  );

  return routeur;
};
