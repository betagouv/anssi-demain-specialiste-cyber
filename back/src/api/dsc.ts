import { ConfigurationServeurLab, creeServeurLab } from '@lab-anssi/lib';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';

export interface ConfigurationServeur {
  serveurLab: ConfigurationServeurLab;
  entrepotRessourcesCyber: EntrepotRessourcesCyber;
}

export const creeServeur = (configurationServeur: ConfigurationServeur) => {
  const app = creeServeurLab(configurationServeur.serveurLab);

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
