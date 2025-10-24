import { Express } from 'express';
import * as Sentry from '@sentry/node';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { fauxAdaptateurGestionErreur } from './fauxAdaptateurGestionErreur';

export interface AdaptateurGestionErreur {
  controleurErreurs(applicationExpress: Express): void;
}

const adaptateurGestionErreurSentry: AdaptateurGestionErreur = {
  controleurErreurs: (applicationExpress: Express) => {
    Sentry.setupExpressErrorHandler(applicationExpress);
  },
};

export const fabriqueAdaptateurGestionErreur = (): AdaptateurGestionErreur => {
  if (!adaptateurEnvironnement.sentry().dsn()) {
    return fauxAdaptateurGestionErreur;
  }
  return adaptateurGestionErreurSentry;
};
