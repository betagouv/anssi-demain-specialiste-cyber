import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourceJeu } from './ressourceJeu';
import { ressourceJeux } from './ressourceJeux';
import { ressourceProfil } from './ressourceProfil';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';
import { ressourceUtilisateurs } from './ressourceUtilisateurs';

export const ressourcesApi = (configurationServeur: ConfigurationServeur) => {
  const router = Router();

  router.use('/profil', ressourceProfil(configurationServeur));
  router.use('/utilisateurs', ressourceUtilisateurs(configurationServeur));
  router.use(
    '/jeux',
    ressourceJeux(configurationServeur),
    ressourceJeu(configurationServeur),
  );
  router.use(
    '/ressources-cyber',
    ressourceRessourceCyber(configurationServeur),
  );

  return router;
};
