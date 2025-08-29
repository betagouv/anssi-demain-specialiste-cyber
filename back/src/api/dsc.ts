import { ConfigurationServeurLab, creeServeurLab } from '@lab-anssi/lib';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { RecupereCheminVersFichiersStatiques } from '../infra/recupereCheminVersFichiersStatiques';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { AdaptateurJWT } from './adaptateurJWT';
import { AdaptateurOIDC } from './oidc/adaptateurOIDC';
import { ressourceApresAuthentificationOIDC } from './oidc/ressourceApresAuthentificationOIDC';
import { ressourceConnexionOIDC } from './oidc/ressourceConnexionOIDC';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';

export interface ConfigurationServeur {
  serveurLab: ConfigurationServeurLab;
  entrepotRessourcesCyber: EntrepotRessourcesCyber;
  adaptateurOIDC: AdaptateurOIDC;
  adaptateurJWT: AdaptateurJWT;
  entrepotUtilisateur: EntrepotUtilisateur;
  adaptateurHachage: AdaptateurHachage;
  recupereCheminVersFichiersStatiques: RecupereCheminVersFichiersStatiques;
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

  app.use(
    '/',
    express.static(configurationServeur.recupereCheminVersFichiersStatiques())
  );

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
