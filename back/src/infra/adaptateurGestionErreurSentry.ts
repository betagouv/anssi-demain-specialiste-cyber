import { Express, NextFunction, Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { IpDeniedError } from 'express-ipfilter';
import { fauxAdaptateurGestionErreur } from './fauxAdaptateurGestionErreur';

export interface AdaptateurGestionErreur {
  initialise(): void;
  controleurErreursIP(
    erreur: Error,
    requete: Request,
    reponse: Response,
    suite: NextFunction,
  ): void;
  controleurErreurs(applicationExpress: Express): void;
}

const adaptateurGestionErreurSentry: AdaptateurGestionErreur = {
  initialise: () => {
    const config = adaptateurEnvironnement.sentry();

    Sentry.init({
      debug: true,
      dsn: config.dsn(),
      environment: config.environnement(),
      integrations: [
        Sentry.expressIntegration(),
        Sentry.postgresIntegration(),
        Sentry.httpServerIntegration(),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      enableLogs: true,
    });
    Sentry.setTag('dsc-source', 'backend');
  },
  controleurErreursIP: (
    erreur: Error,
    _requete: Request,
    reponse: Response,
    suite,
  ) => {
    if (erreur instanceof IpDeniedError) {
      reponse.status(401);
      reponse.end();
    } else {
      suite(erreur);
    }
  },
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
