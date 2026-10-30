import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceFonctions = ({
  entrepôtFonctions,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (_requête, réponse) => {
    const fonctions = await entrepôtFonctions.tous();
    réponse.send(fonctions);
  });

  return routeur;
};
