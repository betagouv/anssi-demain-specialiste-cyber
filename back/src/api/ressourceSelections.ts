import { Router } from 'express';
import { EntrepotSelections } from '../metier/entrepotSelections';

export const ressourceSelections = (entrepotSelections: EntrepotSelections) => {
  const routeur = Router();

  routeur.get('/', async (_requete, reponse) => {
    const toutesLesSelections = await entrepotSelections.tous();
    reponse.send(toutesLesSelections);
  });

  return routeur;
};
