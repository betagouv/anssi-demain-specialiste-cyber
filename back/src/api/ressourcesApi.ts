import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourceJeu } from './ressourceJeu';
import { ressourceJeux } from './ressourceJeux';
import { ressourceMesJeux } from './ressourceMesJeux';
import { ressourceMetier } from './ressourceMetier';
import { ressourceProfil } from './ressourceProfil';
import { ressourceReactionsJeu } from './ressourceReactionsJeu';
import { ressourceRessourceCyber } from './ressourceRessourcesCyber';
import { ressourceSelections } from './ressourceSelections';
import { ressourceUtilisateurs } from './ressourceUtilisateurs';

export const ressourcesApi = (configurationServeur: ConfigurationServeur) => {
  const router = Router();

  router.use('/profil', ressourceProfil(configurationServeur));
  router.use('/utilisateurs', ressourceUtilisateurs(configurationServeur));
  router.use('/mes-jeux', ressourceMesJeux(configurationServeur));
  router.use(
    '/jeux',
    ressourceJeux(configurationServeur),
    ressourceJeu(configurationServeur),
    ressourceReactionsJeu(configurationServeur),
  );
  router.use(
    '/ressources-cyber',
    ressourceRessourceCyber(configurationServeur),
  );
  router.use('/metiers', ressourceMetier(configurationServeur));
  router.use(
    '/selections-enseignants',
    ressourceSelections(configurationServeur.entrepotSelectionsEnseignants),
  );
  router.use(
    '/selections-eleves',
    ressourceSelections(configurationServeur.entrepotSelectionsEleves),
  );

  return router;
};
