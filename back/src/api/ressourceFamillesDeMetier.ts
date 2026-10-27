import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceFamillesDeMétier = ({
  entrepôtFamillesDeMétier,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (_requête, réponse) => {
    const familles = await entrepôtFamillesDeMétier.tous();
    réponse.send(familles);
  });

  return routeur;
};
