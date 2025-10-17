import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceSelectionsEnseignants = ({
  entrepotSelectionsEnseignants,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (_requete, reponse) => {
    const toutesLesSelections = await entrepotSelectionsEnseignants.tous();
    reponse.send(toutesLesSelections);
  });

  return routeur;
};
