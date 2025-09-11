import { Request, Response, Router } from 'express';
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
      entrepotJeux.ajoute({ nom });
      reponse.sendStatus(201);
    } catch {
      reponse.sendStatus(401);
    }
  });
  return routeur;
};
