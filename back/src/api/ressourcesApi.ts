import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourceJeu } from './ressourceJeu';
import { ressourceMesJeux } from './ressourceMesJeux';
import { ressourceProfil } from './ressourceProfil';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';
import { ressourceUtilisateurs } from './ressourceUtilisateurs';
import { ressourceJeux } from './ressourceJeux';
import { ressourceMetier } from './ressourceMetier';
import { ressourceSelectionsEnseignants } from './ressourceSelectionsEnseignants';

export const ressourcesApi = (configurationServeur: ConfigurationServeur) => {
  const router = Router();

  router.use('/profil', ressourceProfil(configurationServeur));
  router.use('/utilisateurs', ressourceUtilisateurs(configurationServeur));
  router.use('/mes-jeux', ressourceMesJeux(configurationServeur));
  router.use(
    '/jeux',
    ressourceJeux(configurationServeur),
    ressourceJeu(configurationServeur),
  );
  router.use(
    '/ressources-cyber',
    ressourceRessourceCyber(configurationServeur),
  );
  router.use('/metiers', ressourceMetier(configurationServeur));
  router.use(
    '/selections-enseignants',
    ressourceSelectionsEnseignants(configurationServeur),
  );

  return router;
};
