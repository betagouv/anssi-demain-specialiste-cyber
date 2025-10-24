// Sentry doit être initialisé avant l’import d’express [voir installation](https://docs.sentry.io/platforms/javascript/guides/express/install/commonjs/)
// L’initialisation de Sentry prend en compte la présence des variables
// d’environnement nécessaires à son exécution
import '../infra/sentry';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express, { json } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourcesApi } from './ressourcesApi';
import { ressourcesOidc } from './ressourcesOidc';
import { ressourcesPages } from './ressourcesPages';
import { creeServeurLab } from '@lab-anssi/lib';

export const creeServeur = (configurationServeur: ConfigurationServeur) => {
  const { serveurLab } = configurationServeur;
  const app = creeServeurLab(serveurLab);

  app.use(configurationServeur.middleware.ajouteLeNonceALaReponse);
  app.use(configurationServeur.middleware.positionneLesCsp);

  app.use(json());
  app.use(
    cookieSession({
      name: 'session',
      sameSite: true,
      secret: process.env.SECRET_COOKIE,
      secure:
        configurationServeur.adaptateurEnvironnement.nodeEnv() !==
        'developpement',
      signed:
        configurationServeur.adaptateurEnvironnement.nodeEnv() !==
        'developpement',
    }),
  );

  app.use(cookieParser());

  configurationServeur
    .recupereCheminsVersFichiersStatiques()
    .forEach((chemin) => {
      app.use('/', express.static(chemin));
    });

  app.use(configurationServeur.middleware.verifieModeMaintenance);
  app.use('/oidc', ressourcesOidc(configurationServeur));
  app.use('/api', ressourcesApi(configurationServeur));

  app.set('view engine', 'pug');
  app.set('views', './vues');
  app.use(ressourcesPages(configurationServeur));

  configurationServeur.adaptateurGestionErreur.controleurErreurs(app);

  return app;
};
