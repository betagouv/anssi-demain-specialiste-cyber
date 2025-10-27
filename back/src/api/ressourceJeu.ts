import { Router } from 'express';
import z from 'zod';
import { Jeu } from '../metier/jeu';
import { Utilisateur } from '../metier/utilisateur';
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
  adaptateurHachage,
  entrepotJeux,
  entrepotUtilisateur,
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
    middleware.ajouteUtilisateurARequete(
      entrepotUtilisateur,
      adaptateurHachage,
    ),
    async (requete, reponse) => {
      const { utilisateur }: { utilisateur: Utilisateur | undefined } = requete;
      const jeu = await entrepotJeux.parId(
        (requete.params as Record<string, string>).id,
      );
      if (!jeu) {
        return reponse.sendStatus(404);
      }

      if (!utilisateur || jeu.enseignant?.email !== utilisateur.email) {
        return reponse.sendStatus(403);
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
