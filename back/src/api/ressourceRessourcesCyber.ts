import { Request, Response, Router } from 'express';
import { ConfigurationServeur } from './dsc';

export const ressourceRessourceCyber = ({
  entrepotRessourcesCyber,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (_requete: Request, reponse: Response) => {
    const ressources = (await entrepotRessourcesCyber?.tous()) ?? [];
    reponse.send(ressources);
  });

  return routeur;
};
