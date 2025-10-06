import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
  urlencoded,
} from 'express';
import * as core from 'express-serve-static-core';
import z from 'zod';
import { JeuCree } from '../bus/evenements/jeu/jeuCree';
import { Jeu } from '../metier/jeu';
import { categoriesDeJeux } from '../metier/referentiels/categorieDeJeux';
import { classes } from '../metier/referentiels/classes';
import { disciplines } from '../metier/referentiels/disciplines';
import { sequences } from '../metier/referentiels/sequence';
import { thematiquesDeJeux } from '../metier/referentiels/thematiqueDeJeux';
import { ConfigurationServeur } from './configurationServeur';
import multer from 'multer';

const chaineNonVide = (message: string) =>
  z.string(message).trim().min(1, message);

const verifieNoteEvaluation = (message: string) =>
  z
    .number()
    .min(1, {
      error: message,
    })
    .max(5, {
      error: message,
    });

export const schemaJeu = z.strictObject({
  nom: chaineNonVide('Le nom est obligatoire'),
  nomEtablissement: chaineNonVide('Le nom de l‘établissement est obligatoire'),
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
  categorie: z.enum(categoriesDeJeux, {
    error: 'La catégorie est invalide',
  }),
  thematiques: z
    .array(
      z.enum(thematiquesDeJeux, {
        error: 'La thématique est invalide',
      }),
    )
    .nonempty('La thématique est invalide'),
  description: chaineNonVide('La description du jeu est obligatoire').max(
    8000,
    'La description ne peut contenir que 8000 caractères maximum',
  ),
  temoignages: z
    .array(
      z.strictObject({
        prenom: z.string('Le prénom est obligatoire dans un témoignage'),
        details: z
          .string('Les détails sont obligatoires dans un témoignage')
          .max(
            8000,
            'Les détails d‘un témoignage ne peuvent excéder 8000 caractères',
          ),
      }),
    )
    .optional(),
  evaluationDecouverte: verifieNoteEvaluation(
    'La note d‘évaluation pour la découverte doit être comprise entre 1 et 5',
  ),
  evaluationInteret: verifieNoteEvaluation(
    'La note d‘évaluation pour l‘intérêt doit être comprise entre 1 et 5',
  ),
  evaluationSatisfactionGenerale: verifieNoteEvaluation(
    'La note d‘évaluation pour la satisfaction générale doit être comprise entre 1 et 5',
  ),
  precisions: z
    .string()
    .trim()
    .nonempty('Les précisions ne peuvent pas être vides')
    .optional(),
});

type CorpsRequeteDeJeu = {
  jeu: string;
};

export const CINQ_MO = 5 * 1024 * 1024;

const valideLesPhotosTeleversees: RequestHandler = async (
  requete: Request,
  reponse: Response,
  suite: NextFunction,
) => {
  const libellesErreur: Map<string, string> = new Map([
    ['photos_LIMIT_FILE_COUNT', 'Le nombre de photos maximum par jeu est de 5'],
    [
      'couverture_LIMIT_FILE_COUNT',
      'Une seule photo de couverture est autorisée',
    ],
    [
      'photos_LIMIT_UNEXPECTED_FILE',
      'Le nombre de photos maximum par jeu est de 5',
    ],
    [
      'couverture_LIMIT_UNEXPECTED_FILE',
      'Une seule photo de couverture est autorisée',
    ],
    ['photos_LIMIT_FILE_SIZE', 'Le poids maximum d’une photo est de 5MO'],
    [
      'couverture_LIMIT_FILE_SIZE',
      'Le poids maximum de la couverture est de 5MO',
    ],
  ]);
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: CINQ_MO },
  }).fields([
    { name: 'photos', maxCount: 4 },
    { name: 'couverture', maxCount: 1 },
  ])(requete, reponse, (err) => {
    if (err && err instanceof multer.MulterError) {
      return reponse.status(400).json({
        erreur:
          libellesErreur.get(`${err.field}_${err.code}`) ||
          'Une erreur est survenue',
      });
    }
    return suite();
  });
};

export const ressourceMesJeux = ({
  entrepotJeux,
  entrepotUtilisateur,
  adaptateurHachage,
  middleware,
  busEvenements,
  adaptateurTeleversement,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.post(
    '/',
    urlencoded(),
    middleware.ajouteUtilisateurARequete(
      entrepotUtilisateur,
      adaptateurHachage,
    ),
    valideLesPhotosTeleversees,
    async (
      requete: Request<
        core.ParamsDictionary,
        Jeu | { erreur: string },
        CorpsRequeteDeJeu,
        qs.ParsedQs
      >,
      reponse: Response,
    ) => {
      try {
        const corpsRequeteJeu = JSON.parse(requete.body.jeu);
        const resultat = schemaJeu.safeParse(corpsRequeteJeu);
        if (!resultat.success) {
          return reponse
            .status(400)
            .json({ erreur: resultat.error.issues[0].message });
        }
        const utilisateurConnecte = requete.utilisateur;
        const photosJeu = adaptateurTeleversement.photosJeu(requete);
        await adaptateurTeleversement.sauvegarde(photosJeu);

        const {
          nom,
          sequence,
          nomEtablissement,
          classe,
          discipline,
          eleves,
          categorie,
          thematiques,
          description,
          temoignages,
          evaluationDecouverte,
          evaluationInteret,
          evaluationSatisfactionGenerale,
          precisions,
        } = resultat.data;
        await entrepotJeux.ajoute(
          new Jeu({
            nom,
            enseignant: utilisateurConnecte,
            sequence,
            nomEtablissement,
            classe,
            discipline,
            eleves,
            categorie,
            thematiques,
            description,
            temoignages,
            photos: {
              couverture: { chemin: photosJeu.couverture.chemin },
              photos: photosJeu.photos.map((p) => ({ chemin: p.chemin })),
            },
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
            eleves.length,
            categorie,
            thematiques,
            temoignages?.length || 0,
            evaluationDecouverte,
            evaluationInteret,
            evaluationSatisfactionGenerale,
            precisions,
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
