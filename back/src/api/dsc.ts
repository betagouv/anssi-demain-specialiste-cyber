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
import { ressourceApresDeconnexionOIDC } from './oidc/ressourceApresDeconnexionOIDC';
import { ressourceConnexionOIDC } from './oidc/ressourceConnexionOIDC';
import { ressourceDeconnexionOIDC } from './oidc/ressourceDeconnexionOIDC';
import { ressourceProfil } from './ressourceProfil';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';

export interface ConfigurationServeur {
  serveurLab: ConfigurationServeurLab;
  entrepotRessourcesCyber: EntrepotRessourcesCyber;
  adaptateurOIDC: AdaptateurOIDC;
  adaptateurJWT: AdaptateurJWT;
  entrepotUtilisateur: EntrepotUtilisateur;
  adaptateurHachage: AdaptateurHachage;
  recupereCheminsVersFichiersStatiques: RecupereCheminVersFichiersStatiques;
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

  configurationServeur
    .recupereCheminsVersFichiersStatiques()
    .forEach((chemin) => {
      app.use('/', express.static(chemin));
    });

  app.use('/oidc/connexion', ressourceConnexionOIDC(configurationServeur));
  app.use(
    '/oidc/apres-authentification',
    ressourceApresAuthentificationOIDC(configurationServeur)
  );
  app.use('/oidc/deconnexion', ressourceDeconnexionOIDC(configurationServeur));
  app.use('/oidc/apres-deconnexion', ressourceApresDeconnexionOIDC());

  app.use('/api/profil', ressourceProfil(configurationServeur));

  app.use(
    '/api/ressources-cyber',
    ressourceRessourceCyber(configurationServeur)
  );

  app.set('view engine', 'pug');
  app.set('views', './vues');

  app.get('/', (_req, res) => {
    res.render('index');
  });

  // Route pour les pages dynamiques pour rendre les pages PUG.
  // Doit être en dernier pour ne pas interférer avec les autres routes.
  app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.render(page, (err: Error | null, html?: string) => {
      if (err) {
        res.status(404).render('404');
      } else {
        res.send(html);
      }
    });
  });

  return app;
};
