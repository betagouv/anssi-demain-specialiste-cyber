import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
  urlencoded,
} from 'express';
import * as core from 'express-serve-static-core';
import multer from 'multer';
import { JeuCree } from '../bus/evenements/jeu/jeuCree';
import { AdaptateurAntivirus } from '../infra/adaptateurAntivirus';
import { AdaptateurTeleversement } from '../infra/adaptateurTeleversement';
import { Jeu } from '../metier/jeu';
import { ConfigurationServeur } from './configurationServeur';
import { filetRouteAsynchrone } from './middleware';
import { schemaCreationJeu } from './schemasJeu';

type CorpsRequeteDeJeu = {
  jeu: string;
};

export const CINQ_MO = 5 * 1024 * 1024;

const lanceAnalyseAntivirus = (
  adaptateurAntivirus: AdaptateurAntivirus,
): RequestHandler => {
  return async (requete: Request, reponse: Response, suite: NextFunction) => {
    const lesFichiers = Object.values(requete.files ?? []).flatMap((f) => f);
    const buffers = lesFichiers?.map((f: Express.Multer.File) =>
      Buffer.from(f.buffer),
    );
    const resultatAnalyseFichier = await adaptateurAntivirus.analyse(buffers);
    let erreur: string | undefined = undefined;
    if (resultatAnalyseFichier.estInfecte) {
      erreur = 'Un des fichiers est infecté';
    } else if (resultatAnalyseFichier.estEnErreur) {
      erreur = 'Le traitement de vos photos n’a pu aboutir';
    }
    if (erreur) {
      return reponse.status(400).json({ erreur });
    }
    suite();
  };
};

const valideLesPhotosTeleversees = (
  adaptateurTeleversement: AdaptateurTeleversement,
): RequestHandler => {
  return async (requete: Request, reponse: Response, suite: NextFunction) => {
    const libellesErreur: Map<string, string> = new Map([
      [
        'photos_LIMIT_FILE_COUNT',
        'Le nombre de photos maximum par jeu est de 5',
      ],
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
      if (requete.files) {
        for (const fichiers of Object.values(requete.files)) {
          for (const fichier of fichiers) {
            const mimeTypeDeLImage = adaptateurTeleversement.recupereTypeImage(
              fichier.buffer,
            );
            const typesAutorises = ['image/jpeg', 'image/png'];
            if (
              !mimeTypeDeLImage ||
              !typesAutorises.includes(mimeTypeDeLImage)
            ) {
              return reponse.status(400).json({
                erreur: "Le fichier n'est pas supporté",
              });
            }
          }
        }
      }

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
};
export const ressourceMesJeux = ({
  entrepotJeux,
  entrepotUtilisateur,
  adaptateurHachage,
  middleware,
  busEvenements,
  adaptateurTeleversement,
  adaptateurAntivirus,
  adaptateurGestionErreur,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.post(
    '/',
    urlencoded(),
    middleware.ajouteUtilisateurARequete(
      entrepotUtilisateur,
      adaptateurHachage,
    ),
    valideLesPhotosTeleversees(adaptateurTeleversement),
    lanceAnalyseAntivirus(adaptateurAntivirus),
    filetRouteAsynchrone(
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
          const resultat = schemaCreationJeu.safeParse(corpsRequeteJeu);
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
            consentement,
          } = resultat.data;
          const jeu = new Jeu({
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
            consentement,
          });
          await entrepotJeux.ajoute(jeu);
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
              jeu.consentement,
              precisions,
            ),
          );
          reponse.sendStatus(201);
        } catch (e: unknown | Error) {
          adaptateurGestionErreur.erreur(e as Error, 'Erreur de création du jeu');
          reponse.sendStatus(401);
        }
      },
    ),
  );

  routeur.get(
    '/',
    middleware.ajouteUtilisateurARequete(
      entrepotUtilisateur,
      adaptateurHachage,
    ),
    filetRouteAsynchrone(async (requete, reponse) => {
      const jeux = await entrepotJeux.lesJeuxDe(requete.utilisateur);
      reponse.send(
        jeux.map((jeu) => ({
          id: jeu.id,
          nom: jeu.nom,
          thematiques: jeu.thematiques,
          nomEtablissement: jeu.nomEtablissement,
          eleves: jeu.eleves,
          photos: jeu.photos,
          estCache: jeu.estCache,
          reactions: jeu.reactions,
        })),
      );
    }),
  );

  return routeur;
};
