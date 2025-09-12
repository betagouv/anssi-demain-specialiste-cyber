import { creeServeurLab } from '@lab-anssi/lib';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express, { json } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourcesApi } from './ressourcesApi';
import { ressourcesOidc } from './ressourcesOidc';
import { ressourcesPages } from './ressourcesPages';

export const creeServeur = (configurationServeur: ConfigurationServeur) => {
  const { serveurLab } = configurationServeur;
  const app = creeServeurLab(serveurLab);

  app.use(json());
  app.use(
    cookieSession({
      name: 'session',
      sameSite: true,
      secret: process.env.SECRET_COOKIE,
      secure: process.env.NODE_ENV === 'production',
      signed: process.env.NODE_ENV === 'production',
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

  return app;
};
