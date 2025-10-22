import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'node:crypto';
import z from 'zod';
import { ConfigurationServeurSansMiddleware } from './configurationServeur';
import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { Utilisateur } from '../metier/utilisateur';
import helmet from 'helmet';

type FonctionMiddleware<TBody> = (
  requete: Request<unknown, unknown, TBody, unknown, never>,
  reponse: Response,
  suite: NextFunction,
) => Promise<void>;

export type Middleware = {
  ajouteLeNonceALaReponse: FonctionMiddleware<unknown>;
  positionneLesCsp: FonctionMiddleware<unknown>;
  verifieModeMaintenance: FonctionMiddleware<unknown>;
  valideLaCoherenceDuCorps: <
    TZod extends z.ZodType,
    TBody extends z.infer<TZod>,
  >(
    object: TZod,
  ) => FonctionMiddleware<TBody>;
  verifieJWTNavigation: FonctionMiddleware<unknown>;
  ajouteUtilisateurARequete(
    entrepotUtilisateur: EntrepotUtilisateur,
    adaptateurHachage: AdaptateurHachage,
  ): FonctionMiddleware<unknown>;
};

export type RequeteNonTypee = Request<
  unknown,
  unknown,
  unknown,
  unknown,
  never
>;

export const fabriqueMiddleware = ({
  adaptateurEnvironnement,
  adaptateurJWT,
  moteurDeRendu,
}: ConfigurationServeurSansMiddleware): Middleware => {
  const ajouteLeNonceALaReponse = async (
    _requete: RequeteNonTypee,
    reponse: Response,
    suite: NextFunction,
  ) => {
    reponse.locals.nonce = randomBytes(24).toString('base64');
    suite();
  };

  const verifieModeMaintenance = async (
    _requete: RequeteNonTypee,
    reponse: Response,
    suite: NextFunction,
  ) => {
    if (adaptateurEnvironnement.maintenance().actif()) {
      reponse
        .status(HttpStatusCode.ServiceUnavailable)
        .set('Content-Type', 'text/html');

      moteurDeRendu.rends(reponse, 'maintenance');
    } else {
      suite();
    }
  };

  const valideLaCoherenceDuCorps =
    <TZod extends z.ZodType, TBody extends z.infer<TZod>>(objet: TZod) =>
    async (
      requete: Request<unknown, unknown, TBody, unknown, never>,
      reponse: Response,
      suite: NextFunction,
    ) => {
      const resultat = objet.safeParse(requete.body);
      if (!resultat.success) {
        reponse.status(400).json({ erreur: resultat.error.issues[0].message });
      } else {
        suite();
      }
    };

  const verifieJWTNavigation = async (
    requete: RequeteNonTypee,
    reponse: Response,
    suite: NextFunction,
  ) => {
    if (!requete.session?.token) {
      return reponse.redirect('/connexion');
    }
    try {
      adaptateurJWT.decode(requete.session.token);
      suite();
    } catch {
      reponse.redirect('/connexion');
    }
  };

  const ajouteUtilisateurARequete =
    (
      entrepotUtilisateur: EntrepotUtilisateur,
      adaptateurHachage: AdaptateurHachage,
    ) =>
    async (
      requete: RequeteNonTypee & { utilisateur?: Utilisateur | undefined },
      reponse: Response,
      suite: NextFunction,
    ) => {
      let email: string | undefined;
      try {
        email = adaptateurJWT.decode(requete.session?.token)?.email;
      } catch {
        reponse.sendStatus(401);
        return;
      }
      try {
        requete.utilisateur = email
          ? await entrepotUtilisateur.parEmailHache(
              adaptateurHachage.hache(email),
            )
          : undefined;
        suite();
      } catch {
        reponse.sendStatus(500);
      }
    };

  const positionneLesCsp = async (
    requete: RequeteNonTypee,
    reponse: Response,
    suite: NextFunction,
  ) =>
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: [
            "'self'",
            `'nonce-${reponse.locals.nonce}'`,
            'https://stats.beta.gouv.fr',
            'https://browser.sentry-cdn.com',
            'https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com',
          ],
          imgSrc: [
            "'self'",
            'blob:',
            'https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com',
            'https://ressources-cyber.cellar-c2.services.clever-cloud.com',
            adaptateurEnvironnement.cellarPhotosJeux(),
            'data:',
          ],
          connectSrc: [
            "'self'",
            'https://stats.beta.gouv.fr',
            'https://data.education.gouv.fr/api/v2/catalog/datasets/fr-en-annuaire-education/',
          ],
          mediaSrc: [
            "'self'",
            'blob:',
            'https://ressources-cyber.cellar-c2.services.clever-cloud.com',
          ],
          styleSrc: [
            "'self'",
            `'nonce-${reponse.locals.nonce}'`,
            'https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com',
          ],
          frameSrc: ['https://umap.incubateur.anct.gouv.fr'],
        },
      },
    })(requete, reponse, suite);

  return {
    ajouteLeNonceALaReponse,
    positionneLesCsp,
    verifieModeMaintenance,
    valideLaCoherenceDuCorps,
    verifieJWTNavigation,
    ajouteUtilisateurARequete,
  };
};
