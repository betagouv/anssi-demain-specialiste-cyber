import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { familleDeMétierPrésentation } from './ressourceFamilleDeMetier';

export const ressourceFamillesDeMétier = ({ entrepôtFamillesDeMétier }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (_requête, réponse) => {
    const familles = await entrepôtFamillesDeMétier.tous();
    réponse.send(familles.map((f) => familleDeMétierPrésentation(f)));
  });

  return routeur;
};
