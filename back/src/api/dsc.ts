import { ConfigurationServeurLab, creeServeurLab } from '@lab-anssi/lib';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';
import { AdaptateurOIDC } from './oidc/adaptateurOIDC';
import { ressourceConnexionOIDC } from './oidc/ressourceConnexionOIDC';
import { AdaptateurJWT } from './adaptateurJWT';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { ressourceApresAuthentificationOIDC } from './oidc/ressourceApresAuthentificationOIDC';
import { AdaptateurHachage } from '../infra/adaptateurHachage';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

export interface ConfigurationServeur {
  serveurLab: ConfigurationServeurLab;
  entrepotRessourcesCyber: EntrepotRessourcesCyber;
  adaptateurOIDC: AdaptateurOIDC;
  adaptateurJWT: AdaptateurJWT;
  entrepotUtilisateur: EntrepotUtilisateur;
  adaptateurHachage: AdaptateurHachage;
}

export const creeServeur = (configurationServeur: ConfigurationServeur) => {
  const app = creeServeurLab(configurationServeur.serveurLab);

  app.use(
    cookieSession({
      name: 'session',
      sameSite: true,
      secret: process.env.SECRET_COOKIE,
      secure: process.env.NODE_ENV === 'production',
      signed: process.env.NODE_ENV === 'production',
    })
  );

  app.use(cookieParser());

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
    '/oidc/apres-authentification',
    ressourceApresAuthentificationOIDC(configurationServeur)
  );

  app.use(
    '/api/ressources-cyber',
    ressourceRessourceCyber(configurationServeur)
  );

  return app;
};
