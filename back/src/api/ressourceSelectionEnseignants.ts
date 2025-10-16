import { Router } from 'express';

export const ressourceSelectionEnseignants = () => {
  const routeur = Router();
  routeur.get('/', async (_requete, reponse) => {
    reponse.sendStatus(200);
  });
  return routeur;
};
