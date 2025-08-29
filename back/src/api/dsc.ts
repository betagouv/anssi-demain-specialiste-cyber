import { ConfigurationServeurLab, creeServeurLab } from '@lab-anssi/lib';
import express from 'express';
import { RecupereCheminVersFichiersStatiques } from '../infra/recupereCheminVersFichiersStatiques';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';

export interface ConfigurationServeur {
  serveurLab: ConfigurationServeurLab;
  entrepotRessourcesCyber: EntrepotRessourcesCyber;
  recupereCheminVersFichiersStatiques: RecupereCheminVersFichiersStatiques;
}

export const creeServeur = (configurationServeur: ConfigurationServeur) => {
  const app = creeServeurLab(configurationServeur.serveurLab);

  app.use(
    '/',
    express.static(configurationServeur.recupereCheminVersFichiersStatiques())
  );

  app.use(
    '/api/ressources-cyber',
    ressourceRessourceCyber(configurationServeur)
  );

  return app;
};
