import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import z from 'zod';

export const ressourceReactionsJeu = ({
  entrepotJeux,
  middleware,
}: ConfigurationServeur) => {
  const routeur = Router();
  const schema = z.strictObject({
    action: z.enum(['ajout', 'retrait']),
    type: z.enum(['❤️', '🔥', '👍']),
  });

  routeur.post(
    '/:idJeu/reactions',
    middleware.valideLaCoherenceDuCorps(schema),
    async (requete, reponse) => {
      const jeu = await entrepotJeux.parId(
        (requete.params as Record<string, string>).idJeu,
      );

      if (!jeu) return reponse.sendStatus(404);

      switch (requete.body.action) {
        case 'ajout':
          jeu.incrementeReaction(requete.body.type);
          break;
        case 'retrait':
          jeu.decrementeReaction(requete.body.type);
          break;
      }

      await entrepotJeux.metsAjour(jeu);

      reponse.sendStatus(200);
    },
  );

  return routeur;
};
