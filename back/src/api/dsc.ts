import express from 'express';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';

export type ConfigurationServeur = {
  entrepotRessourcesCyber?: EntrepotRessourcesCyber;
};

export const creeServeur = (
  configurationServeur: ConfigurationServeur = {}
) => {
  const app = express();

  app.get('/', (_requete, reponse) => {
    reponse.send('Bonjour DSC');
  });

  app.get('/catalogue', (_requete, reponse) => {
    reponse.sendFile(`./pages/catalogue.html`, {
      root: '.',
    });
  });

  app.use(
    '/api/ressources-cyber',
    ressourceRessourceCyber(configurationServeur)
  );

  return app;
};
