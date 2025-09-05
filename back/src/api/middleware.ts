import { NextFunction, Request, Response } from 'express';
import { AdaptateurEnvironnement } from '../infra/adaptateurEnvironnement';
import { HttpStatusCode } from 'axios';

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
      reponse
        .status(HttpStatusCode.ServiceUnavailable)
        .set('Content-Type', 'text/html')
        .render('maintenance');
    } else {
      suite();
    }
  };

  return {
    verifieModeMaintenance,
  };
};
