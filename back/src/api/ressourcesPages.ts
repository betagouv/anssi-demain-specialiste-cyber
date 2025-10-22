import { Response, Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourceCreationCompte } from './ressourceCreationCompte';

const pages = [
  { route: '/catalogue', protegee: false },
  { route: '/nouveau-jeu', protegee: true },
  { route: '/mes-jeux', protegee: true },
  { route: '/jeux', protegee: false },
  { route: '/cyber-en-jeux', protegee: false },
  { route: '/metiers', protegee: false },
  { route: '/selection-enseignants', protegee: false },
  { route: '/selection-eleves', protegee: false },
  { route: '/devenir-relai', protegee: false },
  { route: '/connexion', protegee: false },
  { route: '/statistiques', protegee: false },
  { route: '/accessibilite', protegee: false },
  { route: '/securite', protegee: false },
  { route: '/evenements', protegee: false },
  { route: '/mentions-legales', protegee: false },
  { route: '/confidentialite', protegee: false },
  { route: '/cgu', protegee: false },
];

export const ressourcesPages = (configurationServeur: ConfigurationServeur) => {
  const { moteurDeRendu } = configurationServeur;
  const router = Router();

  router.get('/', (_, reponse) => moteurDeRendu.rends(reponse, 'index'));
  router.use('/creation-compte', ressourceCreationCompte(configurationServeur));

  pages
    .filter(({ protegee }) => protegee)
    .forEach(({ route }) =>
      router.use(route, configurationServeur.middleware.verifieJWTNavigation),
    );

  pages.forEach(({ route }) => {
    const vue = route.startsWith('/') ? route.slice(1) : route;
    router.use(route, (_, reponse) => moteurDeRendu.rends(reponse, vue));
  });

  // Doit être en dernier pour ne pas interférer avec les autres routes.
  router.use((_, reponse: Response) => {
    reponse.status(404);
    moteurDeRendu.rends(reponse, '404');
  });

  return router;
};
