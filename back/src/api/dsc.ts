import { ConfigurationServeurLab, creeServeurLab } from '@lab-anssi/lib';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';
import { AdaptateurOIDC } from './oidc/adaptateurOIDC';
import { ressourceConnexionOIDC } from './oidc/ressourceConnexionOIDC';

export interface ConfigurationServeur {
  serveurLab: ConfigurationServeurLab;
  entrepotRessourcesCyber: EntrepotRessourcesCyber;
  adaptateurOIDC: AdaptateurOIDC;
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

  app.use('/oidc/connexion', ressourceConnexionOIDC(configurationServeur));

  app.use(
    '/api/ressources-cyber',
    ressourceRessourceCyber(configurationServeur)
  );

  return app;
};
