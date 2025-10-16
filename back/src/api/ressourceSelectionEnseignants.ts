import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceSelectionEnseignants = ({
  entrepotSelectionEnseignants,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (_requete, reponse) => {
    const toutesLesSelections = await entrepotSelectionEnseignants.tous();
    reponse.send(toutesLesSelections);
  });

  return routeur;
};
