import { Request, Response, Router } from 'express';
import { ConfigurationServeur } from './dsc';

export const ressourceProfil = ({ adaptateurJWT }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (requete: Request, reponse: Response) => {
    try {
      adaptateurJWT.decode(requete.session?.token);
    } catch {
      reponse.clearCookie('session');
    } finally {
      reponse.send({
        email: requete.session?.email,
      });
    }
  });

  return routeur;
};
