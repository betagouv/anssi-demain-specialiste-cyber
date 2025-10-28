import { Response, Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';
import { ressourceCreationCompte } from './ressourceCreationCompte';
import path from 'path';

type Page = {
  route: string;
  protegee: boolean;
  chemin?: string;
};

const pages: Page[] = [
  // Pages annexes
  { route: '/a-propos', protegee: false, chemin: 'annexes' },
  { route: '/accessibilite', protegee: false, chemin: 'annexes' },
  { route: '/cgu', protegee: false, chemin: 'annexes' },
  {
    route: '/confidentialite',
    protegee: false,
    chemin: 'annexes',
  },
  {
    route: '/mentions-legales',
    protegee: false,
    chemin: 'annexes',
  },
  { route: '/securite', protegee: false, chemin: 'annexes' },
  { route: '/statistiques', protegee: false, chemin: 'annexes' },
  // Pages principales
  { route: '/catalogue', protegee: false },
  { route: '/connexion', protegee: false },
  { route: '/cyber-en-jeux', protegee: false },
  { route: '/devenir-relai', protegee: false },
  { route: '/evenements', protegee: false },
  { route: '/jeux', protegee: false },
  { route: '/mes-jeux', protegee: true },
  { route: '/metiers', protegee: false },
  { route: '/non-autorise', protegee: false },
  { route: '/nouveau-jeu', protegee: true },
  { route: '/selection-eleves', protegee: false },
  { route: '/selection-enseignants', protegee: false },
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

  pages.forEach(({ route, chemin = '' }) => {
    const vue = path.join(
      chemin,
      route.startsWith('/') ? route.slice(1) : route,
    );
    router.use(route, (_, reponse) => moteurDeRendu.rends(reponse, vue));
  });

  // Doit être en dernier pour ne pas interférer avec les autres routes.
  router.use((_, reponse: Response) => {
    reponse.status(404);
    moteurDeRendu.rends(reponse, '404');
  });

  return router;
};
