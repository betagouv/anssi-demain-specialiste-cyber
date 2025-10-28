import { Router } from 'express';
import z from 'zod';
import { Jeu } from '../metier/jeu';
import { Utilisateur } from '../metier/utilisateur';
import { ConfigurationServeur } from './configurationServeur';
import { sequences } from '../metier/referentiels/sequence';
import { disciplines } from '../metier/referentiels/disciplines';
import { classes } from '../metier/referentiels/classes';
import { categoriesDeJeux } from '../metier/referentiels/categorieDeJeux';
import { thematiquesDeJeux } from '../metier/referentiels/thematiqueDeJeux';

type ReponseJeu = Omit<
  Jeu,
  'enseignant' | 'incrementeReaction' | 'decrementeReaction'
> & {
  enseignant: string;
};

const schemaModificationJeu = z.strictObject({
  nomEtablissement: z.string().optional(),
  sequence: z.enum(sequences).optional(),
  eleves: z.array(z.string()).optional(),
  discipline: z.enum(disciplines).optional(),
  classe: z.enum(classes).optional(),
  nom: z.string().optional(),
  categorie: z.enum(categoriesDeJeux).optional(),
  thematiques: z.array(z.enum(thematiquesDeJeux)).optional(),
  description: z.string().optional(),
  consentement: z.boolean().optional(),
  temoignages: z
    .array(
      z.strictObject({
        prenom: z.string(),
        details: z.string(),
      }),
    )
    .optional(),
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

      jeu.nomEtablissement =
        requete.body.nomEtablissement ?? jeu.nomEtablissement;
      jeu.sequence = requete.body.sequence ?? jeu.sequence;
      jeu.eleves = requete.body.eleves ?? jeu.eleves;
      jeu.discipline = requete.body.discipline ?? jeu.discipline;
      jeu.classe = requete.body.classe ?? jeu.classe;
      jeu.nom = requete.body.nom ?? jeu.nom;
      jeu.categorie = requete.body.categorie ?? jeu.categorie;
      jeu.thematiques = requete.body.thematiques ?? jeu.thematiques;
      jeu.description = requete.body.description ?? jeu.description;
      jeu.consentement = requete.body.consentement ?? jeu.consentement;
      jeu.temoignages = requete.body.temoignages ?? jeu.temoignages;
      jeu.estCache = requete.body.estCache ?? jeu.estCache;

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
