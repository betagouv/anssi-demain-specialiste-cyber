import { Router } from 'express';
import z from 'zod';
import { Jeu } from '../metier/jeu';
import { ConfigurationServeur } from './configurationServeur';

type ReponseJeu = Omit<
  Jeu,
  'enseignant' | 'incrementeReaction' | 'decrementeReaction'
> & {
  enseignant: string;
};

const schemaModificationJeu = z.strictObject({
  estCache: z.boolean().optional(),
});

export const ressourceJeu = ({
  entrepotJeux,
  middleware,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/:id', async (requete, reponse) => {
    const jeu = await entrepotJeux.parId(requete.params.id);
    if (!jeu) {
      return reponse.sendStatus(404);
    }
    reponse.send(enReponseJeu(jeu));
  });

  routeur.patch(
    '/:id',
    middleware.valideLaCoherenceDuCorps(schemaModificationJeu),
    async (requete, reponse) => {
      const jeu = await entrepotJeux.parId(
        (requete.params as Record<string, string>).id,
      );
      if (!jeu) {
        return reponse.sendStatus(404);
      }
      if (requete.body.estCache !== undefined) {
        jeu.estCache = requete.body.estCache;
      }
      await entrepotJeux.metsAjour(jeu);
      reponse.status(200).send(enReponseJeu(jeu));
    },
  );

  return routeur;
};

const enReponseJeu = (jeu: Jeu): ReponseJeu => ({
  ...jeu,
  enseignant: jeu.enseignant?.prenom ?? '',
});
