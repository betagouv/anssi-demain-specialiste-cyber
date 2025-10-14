import { ConfigurationServeur } from './configurationServeur';
import { Request, Response, Router } from 'express';

export const ressourceMetier = ({ entrepotMetier }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get(
    '/:id',
    async (requete: Request<{ id: string }>, reponse: Response) => {
      const metier = await entrepotMetier.parIdentifiant(
        Number(requete.params.id),
      );
      if (!metier) {
        return reponse.sendStatus(404);
      }
      return reponse.send(metier);
    },
  );

  return routeur;
};
