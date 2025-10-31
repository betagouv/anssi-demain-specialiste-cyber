import { Router } from 'express';
import { EntrepotSelections } from '../metier/entrepotSelections';
import { filetRouteAsynchrone } from './middleware';

export const ressourceSelections = (entrepotSelections: EntrepotSelections) => {
  const routeur = Router();

  routeur.get(
    '/',
    filetRouteAsynchrone(async (_requete, reponse) => {
      const toutesLesSelections = await entrepotSelections.tous();
      reponse.send(toutesLesSelections);
    }),
  );

  return routeur;
};
