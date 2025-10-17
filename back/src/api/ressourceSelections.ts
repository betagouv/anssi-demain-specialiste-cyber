import { Router } from 'express';
import { EntrepotSelections } from '../metier/entrepotSelections';
import { EntrepotSelectionsEleves } from '../metier/entrepotSelectionsEleves';

export const ressourceSelections = (
  entrepotSelections: EntrepotSelections | EntrepotSelectionsEleves,
) => {
  const routeur = Router();

  routeur.get('/', async (_requete, reponse) => {
    const toutesLesSelections = await entrepotSelections.tous();
    reponse.send(toutesLesSelections);
  });

  return routeur;
};
