import { HttpStatusCode } from 'axios';
import { Router } from 'express';
import { TestMétiersRéalisé } from '../bus/evenements/TestMetiersRealise';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceRésultatTestMétiers = ({ busEvenements }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.post('/', async (requête, réponse) => {
    await busEvenements.publie(new TestMétiersRéalisé(requête.body.réponses, requête.body.suggestions));
    réponse.sendStatus(HttpStatusCode.Created);
  });

  return routeur;
};
