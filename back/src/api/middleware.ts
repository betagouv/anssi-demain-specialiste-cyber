import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'node:crypto';
import { AdaptateurEnvironnement } from '../infra/adaptateurEnvironnement';

type FonctionMiddleware = (
  requete: Request,
  reponse: Response,
  suite: NextFunction
) => Promise<void>;

export type Middleware = {
  verifieModeMaintenance: FonctionMiddleware;
};

export const fabriqueMiddleware = ({
  adaptateurEnvironnement,
}: {
  adaptateurEnvironnement: AdaptateurEnvironnement;
}): Middleware => {
  const verifieModeMaintenance = async (
    _requete: Request,
    reponse: Response,
    suite: NextFunction
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

  return {
    verifieModeMaintenance,
  };
};
