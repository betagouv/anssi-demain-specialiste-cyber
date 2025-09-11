import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'node:crypto';
import { AdaptateurEnvironnement } from '../infra/adaptateurEnvironnement';
import z from 'zod';

type FonctionMiddleware = (
  requete: Request,
  reponse: Response,
  suite: NextFunction,
) => Promise<void>;

export type Middleware = {
  verifieModeMaintenance: FonctionMiddleware;
  valideLaCoherenceDuCorps: (objet: z.ZodType) => FonctionMiddleware;
};

export const fabriqueMiddleware = ({
  adaptateurEnvironnement,
}: {
  adaptateurEnvironnement: AdaptateurEnvironnement;
}): Middleware => {
  const verifieModeMaintenance = async (
    _requete: Request,
    reponse: Response,
    suite: NextFunction,
  ) => {
    if (adaptateurEnvironnement.maintenance().actif()) {
      const nonce = randomBytes(24).toString('base64');
      reponse
        .status(HttpStatusCode.ServiceUnavailable)
        .set('Content-Type', 'text/html')
        .render('maintenance', { nonce });
    } else {
      suite();
    }
  };

  const valideLaCoherenceDuCorps = (objet: z.ZodType): FonctionMiddleware => {
    return async (requete: Request, reponse: Response, suite: NextFunction) => {
      const resultat = objet.safeParse(requete.body);
      if (!resultat.success) {
        reponse.status(400).json({ erreur: resultat.error.issues[0].message });
      } else {
        suite();
      }
    };
  };

  return {
    verifieModeMaintenance,
    valideLaCoherenceDuCorps,
  };
};
