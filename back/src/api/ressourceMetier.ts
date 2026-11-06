import { Request, Response, Router } from 'express';
import { Metier } from '../metier/metier';
import { ConfigurationServeur } from './configurationServeur';
import { filetRouteAsynchrone } from './middleware';

export const ressourceMetier = ({ entrepotMetier }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get(
    '/:id',
    filetRouteAsynchrone(async (requete: Request, reponse: Response) => {
      const metier = await entrepotMetier.parIdentifiant(Number(requete.params.id));
      if (!metier) {
        return reponse.sendStatus(404);
      }
      return reponse.send(metierPresentation(metier));
    }),
  );

  return routeur;
};

export const metierPresentation = (metier: Metier) => ({ ...metier, idInterne: undefined });
