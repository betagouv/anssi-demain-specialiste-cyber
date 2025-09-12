import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourceApresAuthentificationOIDC } from './oidc/ressourceApresAuthentificationOIDC';
import { ressourceApresDeconnexionOIDC } from './oidc/ressourceApresDeconnexionOIDC';
import { ressourceConnexionOIDC } from './oidc/ressourceConnexionOIDC';
import { ressourceDeconnexionOIDC } from './oidc/ressourceDeconnexionOIDC';

export const ressourcesOidc = (configurationServeur: ConfigurationServeur) => {
  const router = Router();

  router.use('/connexion', ressourceConnexionOIDC(configurationServeur));
  router.use(
    '/apres-authentification',
    ressourceApresAuthentificationOIDC(configurationServeur),
  );
  router.use('/deconnexion', ressourceDeconnexionOIDC(configurationServeur));
  router.use('/apres-deconnexion', ressourceApresDeconnexionOIDC());

  return router;
};
