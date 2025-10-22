import { Router } from 'express';

export const ressourceReactionsJeu = () => {
  const routeur = Router();
  routeur.post('/:idJeu/reactions', (_requete, reponse) => {
    reponse.sendStatus(200);
  });

  return routeur;
};
