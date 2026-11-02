import { HttpStatusCode } from 'axios';
import { Router } from 'express';
import z from 'zod';
import { TestMétiersRéalisé } from '../bus/evenements/TestMetiersRealise';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceRésultatTestMétiers = ({ busEvenements, middleware }: ConfigurationServeur) => {
  const routeur = Router();

  const schema = z.strictObject({
    réponses: z.array(z.number()).min(5).max(5),
    suggestions: z.array(
      z.strictObject({
        correspondance: z.number().min(0).max(1),
        nom: z.string().max(100),
      }),
    ),
  });

  routeur.post('/', middleware.valideLaCoherenceDuCorps(schema), async (requête, réponse) => {
    await busEvenements.publie(new TestMétiersRéalisé(requête.body.réponses, requête.body.suggestions));
    réponse.sendStatus(HttpStatusCode.Created);
  });

  return routeur;
};
