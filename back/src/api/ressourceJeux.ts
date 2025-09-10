import { Router } from 'express';
import { Jeu } from '../metier/jeu';
import z from 'zod';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceJeux = ({
  adaptateurJWT,
  entrepotJeux,
  middleware,
}: ConfigurationServeur) => {
  const routeur = Router();

  const schema = z.strictObject({
    nom: z
      .string('Le nom est obligatoire')
      .trim()
      .min(1, 'Le nom est obligatoire'),
  });

  routeur.post(
    '/',
    middleware.valideLaCoherenceDuCorps(schema),
    async (requete, reponse) => {
      try {
        adaptateurJWT.decode(requete.session?.token);
        const { nom } = requete.body;
        await entrepotJeux.ajoute(new Jeu({ nom }));
        reponse.sendStatus(201);
      } catch {
        reponse.sendStatus(401);
      }
    },
  );
  return routeur;
};
