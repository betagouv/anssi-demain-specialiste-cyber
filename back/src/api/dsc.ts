import { ConfigurationServeurLab, creeServeurLab } from '@lab-anssi/lib';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express, { json } from 'express';
import { randomBytes } from 'node:crypto';
import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { AdaptateurRechercheEntreprise } from '../infra/adaptateurRechercheEntreprise';
import { RecupereCheminVersFichiersStatiques } from '../infra/recupereCheminVersFichiersStatiques';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { AdaptateurJWT } from './adaptateurJWT';
import { Middleware } from './middleware';
import { MoteurDeRendu } from './moteurDeRendu';
import { AdaptateurOIDC } from './oidc/adaptateurOIDC';
import { ressourceApresAuthentificationOIDC } from './oidc/ressourceApresAuthentificationOIDC';
import { ressourceApresDeconnexionOIDC } from './oidc/ressourceApresDeconnexionOIDC';
import { ressourceConnexionOIDC } from './oidc/ressourceConnexionOIDC';
import { ressourceDeconnexionOIDC } from './oidc/ressourceDeconnexionOIDC';
import { ressourceCreationCompte } from './ressourceCreationCompte';
import { ressourceJeux } from './ressourceJeux';
import { ressourceProfil } from './ressourceProfil';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';
import { ressourceUtilisateurs } from './ressourceUtilisateurs';
import { BusEvenements } from '../bus/busEvenements';

export interface ConfigurationServeur {
  serveurLab: ConfigurationServeurLab;
  entrepotRessourcesCyber: EntrepotRessourcesCyber;
  adaptateurOIDC: AdaptateurOIDC;
  adaptateurJWT: AdaptateurJWT;
  adaptateurRechercheEntreprise: AdaptateurRechercheEntreprise;
  entrepotUtilisateur: EntrepotUtilisateur;
  adaptateurHachage: AdaptateurHachage;
  recupereCheminsVersFichiersStatiques: RecupereCheminVersFichiersStatiques;
  middleware: Middleware;
  moteurDeRendu: MoteurDeRendu;
  busEvenements: BusEvenements;
  entrepotJeux: EntrepotJeux;
}

export const creeServeur = (configurationServeur: ConfigurationServeur) => {
  const { moteurDeRendu, serveurLab } = configurationServeur;

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

  app.use('/oidc/connexion', ressourceConnexionOIDC(configurationServeur));
  app.use(
    '/oidc/apres-authentification',
    ressourceApresAuthentificationOIDC(configurationServeur),
  );
  app.use('/oidc/deconnexion', ressourceDeconnexionOIDC(configurationServeur));
  app.use('/oidc/apres-deconnexion', ressourceApresDeconnexionOIDC());

  app.use('/api/profil', ressourceProfil(configurationServeur));
  app.use('/api/utilisateurs', ressourceUtilisateurs(configurationServeur));
  app.use('/api/jeux', ressourceJeux(configurationServeur));

  app.use(
    '/api/ressources-cyber',
    ressourceRessourceCyber(configurationServeur),
  );

  app.set('view engine', 'pug');
  app.set('views', './vues');

  app.get('/', (_req, res) => {
    const nonce = randomBytes(24).toString('base64');
    moteurDeRendu.rends(res, 'index', { nonce });
  });

  app.use('/creation-compte', ressourceCreationCompte(configurationServeur));

  // Route pour les pages dynamiques pour rendre les pages PUG.
  // Doit être en dernier pour ne pas interférer avec les autres routes.
  app.get('/:page', (req, res) => {
    const page = req.params.page;
    const nonce = randomBytes(24).toString('base64');
    moteurDeRendu.rends(
      res,
      page,
      { nonce },
      (err: Error | null, html?: string) => {
        if (err) {
          res.status(404).render('404', { nonce });
        } else {
          res.send(html);
        }
      }
    );
  });

  return app;
};
