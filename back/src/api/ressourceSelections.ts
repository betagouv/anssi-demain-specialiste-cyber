import { Router } from 'express';
import { EntrepotSelectionsEnseignants } from '../metier/entrepotSelectionsEnseignants';
import { EntrepotSelectionsEleves } from '../metier/entrepotSelectionsEleves';

export const ressourceSelections = (
  entrepotSelections: EntrepotSelectionsEnseignants | EntrepotSelectionsEleves,
) => {
  const routeur = Router();

  routeur.get('/', async (_requete, reponse) => {
    const toutesLesSelections = await entrepotSelections.tous();
    reponse.send(toutesLesSelections);
  });

  return routeur;
};
