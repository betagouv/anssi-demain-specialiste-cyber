import { Request, Response, Router } from 'express';

export const ressourceProfil = () => {
  const routeur = Router();

  routeur.get('/', async (requete: Request, reponse: Response) => {
    reponse.send({
      email: requete.session?.email,
    });
  });

  return routeur;
};
