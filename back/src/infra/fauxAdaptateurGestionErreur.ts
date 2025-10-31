import { Express, NextFunction, Request, Response } from 'express';
import { AdaptateurGestionErreur } from './adaptateurGestionErreurSentry';

export const fauxAdaptateurGestionErreur: AdaptateurGestionErreur = {
  controleurErreurs: (applicationExpress: Express) => {
    applicationExpress.use(
      (
        erreur: Error,
        _requete: Request,
        _reponse: Response,
        suite: NextFunction,
      ) => {
        // eslint-disable-next-line no-console
        console.log('Erreur fauxAdaptateurGestionErreur', erreur);
        return suite(erreur);
      },
    );
  },
};
