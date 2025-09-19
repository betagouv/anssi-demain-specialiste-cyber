import { Router } from 'express';
import z from 'zod';
import { JeuCree } from '../bus/evenements/jeu/jeuCree';
import { Jeu } from '../metier/jeu';
import { ConfigurationServeur } from './configurationServeur';
import { sequences } from '../metier/referentiels/sequence';
import { classes } from '../metier/referentiels/classes';
import { disciplines } from '../metier/referentiels/disciplines';

function chaineNonVide(message: string) {
  return z.string(message).trim().min(1, message);
}

export const ressourceJeux = ({
  entrepotJeux,
  entrepotUtilisateur,
  adaptateurHachage,
  middleware,
  busEvenements,
}: ConfigurationServeur) => {
  const routeur = Router();

  const schema = z.strictObject({
    nom: chaineNonVide('Le nom est obligatoire'),
    nomEtablissement: chaineNonVide(
      'Le nom de l‘établissement est obligatoire',
    ),
    discipline: z.enum(disciplines, {
      error: 'La discipline est invalide',
    }),
    classe: z.enum(classes, {
      error: 'La classe est invalide',
    }),
    sequence: z.enum(sequences, {
      error: 'La séquence est invalide',
    }),
    eleves: z
      .array(chaineNonVide('Les prénoms fournis sont invalides'))
      .nonempty('Au moins un élève est requis'),
  });

  routeur.post(
    '/',
    middleware.valideLaCoherenceDuCorps(schema),
    middleware.ajouteUtilisateurARequete(
      entrepotUtilisateur,
      adaptateurHachage,
    ),
    async (requete, reponse) => {
      try {
        const utilisateurConnecte = requete.utilisateur;

        const { nom, sequence, nomEtablissement, classe, discipline, eleves } =
          requete.body;
        await entrepotJeux.ajoute(
          new Jeu({
            nom,
            enseignant: utilisateurConnecte,
            sequence,
            nomEtablissement,
            classe,
            discipline,
            eleves,
          }),
        );
        await busEvenements.publie(
          new JeuCree(
            utilisateurConnecte.email,
            nom,
            sequence,
            nomEtablissement,
            classe,
            discipline,
          ),
        );
        reponse.sendStatus(201);
      } catch {
        reponse.sendStatus(401);
      }
    },
  );

  routeur.get(
    '/',
    middleware.ajouteUtilisateurARequete(
      entrepotUtilisateur,
      adaptateurHachage,
    ),
    async (requete, reponse) => {
      const jeux = await entrepotJeux.lesJeuxDe(requete.utilisateur);
      reponse.send(jeux.map((jeu) => ({ id: jeu.id, nom: jeu.nom })));
    },
  );

  return routeur;
};
