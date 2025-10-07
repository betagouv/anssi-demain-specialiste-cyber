import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourceJeu } from './ressourceJeu';
import { ressourceJeux } from './ressourceJeux';
import { ressourceProfil } from './ressourceProfil';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';
import { ressourceUtilisateurs } from './ressourceUtilisateurs';
import { ressourceJeuxTemp } from './ressourceJeuxTemp';

export const ressourcesApi = (configurationServeur: ConfigurationServeur) => {
  const router = Router();

  router.use('/profil', ressourceProfil(configurationServeur));
  router.use('/utilisateurs', ressourceUtilisateurs(configurationServeur));
  router.use('/mes-jeux', ressourceJeux(configurationServeur));
  router.use(
    '/jeux',
    ressourceJeuxTemp(configurationServeur),
    ressourceJeu(configurationServeur),
  );
  router.use(
    '/ressources-cyber',
    ressourceRessourceCyber(configurationServeur),
  );

  return router;
};
