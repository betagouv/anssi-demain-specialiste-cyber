import { Router } from 'express';
import { Utilisateur } from '../metier/utilisateur';
import z from 'zod';
import { ConfigurationServeur } from './configurationServeur';
import { CompteCree } from '../bus/evenements/compteCree/compteCree';

const ressourceUtilisateurs = ({
  entrepotUtilisateur,
  adaptateurJWT,
  busEvenements,
  middleware,
}: ConfigurationServeur) => {
  const routeur = Router();

  const schema = z.object({
    infolettreAcceptee: z.boolean({
      message: "L'acceptation de l'infolettre est invalide",
    }),
    token: z.string('Le token est invalide'),
  });

  routeur.post(
    '/',
    middleware.valideLaCoherenceDuCorps(schema),
    async (requete, reponse) => {
      const { infolettreAcceptee, token } = requete.body;

      try {
        const { email, nom, prenom, siret } = adaptateurJWT.decode(token);

        const utilisateur = new Utilisateur({
          email,
          prenom,
          nom,
          siretEntite: siret,
          infolettreAcceptee,
        });

        await entrepotUtilisateur.ajoute(utilisateur);

        await busEvenements.publie(
          new CompteCree(email, prenom, nom, infolettreAcceptee),
        );

        reponse.sendStatus(201);
      } catch {
        reponse.status(400).send({ erreur: 'Le token est invalide' });
      }
    },
  );
  return routeur;
};

export { ressourceUtilisateurs };
