import { RequestHandler, Router } from 'express';
import z from 'zod';
import { ConfigurationServeur } from './configurationServeur';
import { filetRouteAsynchrone } from './middleware';



export const ressourceReactionsJeu = ({
  entrepotJeux,
  middleware,
}: ConfigurationServeur) => {
  const routeur = Router();
  const schema = z.strictObject({
    action: z.enum(['ajout', 'retrait']),
    type: z.enum(['❤️', '🔥', '👍']),
  });

  const validateurJeuId: RequestHandler = (requete, reponse, suite) => {
    const schema = z.uuid();
    const resultat = schema.safeParse(requete.params.idJeu);
    if (!resultat.success) {
      reponse.status(400).json({ erreur: 'Id invalide' });
    } else {
      suite();
    }
  };

  routeur.post(
    '/:idJeu/reactions',
    middleware.valideLaCoherenceDuCorps(schema),
    validateurJeuId,
    filetRouteAsynchrone(async (requete, reponse) => {
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
    }),
  );

  return routeur;
};
