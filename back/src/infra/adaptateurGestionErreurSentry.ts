import { Express } from 'express';
import * as Sentry from '@sentry/node';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { fauxAdaptateurGestionErreur } from './fauxAdaptateurGestionErreur';

export interface AdaptateurGestionErreur {
  controleurErreurs(applicationExpress: Express): void;
  erreur(erreur: Error, message?: string): void;
}

const adaptateurGestionErreurSentry: AdaptateurGestionErreur = {
  controleurErreurs: (applicationExpress: Express) => {
    Sentry.setupExpressErrorHandler(applicationExpress);
  },
  erreur(erreur, message) {
    const contexte = typeof message === 'string' ? message : undefined;
    const erreurEnrichie = new Error(contexte, { cause: erreur });
    Sentry.captureException(erreurEnrichie);
  },
};

export const fabriqueAdaptateurGestionErreur = (): AdaptateurGestionErreur => {
  if (!adaptateurEnvironnement.sentry().dsn()) {
    return fauxAdaptateurGestionErreur;
  }
  return adaptateurGestionErreurSentry;
};
