import { Router } from 'express';
import z from 'zod';
import { JeuCree } from '../bus/evenements/jeu/jeuCree';
import { Jeu } from '../metier/jeu';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceJeux = ({
  adaptateurJWT,
  entrepotJeux,
  middleware,
  busEvenements,
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
        const { email } = adaptateurJWT.decode(requete.session?.token);
        const { nom } = requete.body;
        await entrepotJeux.ajoute(new Jeu({ nom }));
        await busEvenements.publie(new JeuCree(email, nom));
        reponse.sendStatus(201);
      } catch {
        reponse.sendStatus(401);
      }
    },
  );
  return routeur;
};
