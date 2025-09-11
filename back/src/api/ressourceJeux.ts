import { Request, Response, Router } from 'express';
import { Jeu } from '../metier/jeu';
import { ConfigurationServeur } from './dsc';

export const ressourceJeux = ({
  adaptateurJWT,
  entrepotJeux,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.post('/', async (requete: Request, reponse: Response) => {
    try {
      adaptateurJWT.decode(requete.session?.token);
      const { nom } = requete.body;
      entrepotJeux.ajoute(new Jeu({ nom }));
      reponse.sendStatus(201);
    } catch {
      reponse.sendStatus(401);
    }
  });
  return routeur;
};
