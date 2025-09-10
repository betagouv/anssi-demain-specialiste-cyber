import { Request, Response, Router } from 'express';
import { ConfigurationServeur } from './dsc';

export const ressourceJeux = ({ entrepotJeux }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.post('/', async (_requete: Request, reponse: Response) => {
    entrepotJeux.ajoute({});
    reponse.sendStatus(201);
  });
  return routeur;
};
