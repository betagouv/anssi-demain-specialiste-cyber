import { AdaptateurGestionErreur } from './adaptateurGestionErreurSentry';
import { NextFunction, Request, Response } from 'express';

export const fauxAdaptateurGestionErreur: AdaptateurGestionErreur = {
  controleurErreurs(): void {},
  initialise(): void {},
  controleurErreursIP(
    erreur: Error,
    _requete: Request,
    _reponse: Response,
    suite: NextFunction,
  ): void {
    suite(erreur);
  },
};
