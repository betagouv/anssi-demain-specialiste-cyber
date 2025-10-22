import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { MoteurDeRendu } from '../../src/api/moteurDeRendu';
import { encodeSession } from './cookie';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('Les ressources de page', () => {
  describe.each(['nouveau-jeu', 'mes-jeux'])(
    `concernant la page protégée /%s`,
    (nomPage) => {
      it('renvoie la page pour un utilisateur connecté', async () => {
        const serveur = creeServeur(configurationDeTestDuServeur());
        const cookie = encodeSession({
          token: 'jeton de test',
        });

        const reponse = await request(serveur)
          .get(`/${nomPage}`)
          .set('Cookie', [cookie]);

        expect(reponse.status).toBe(200);
      });

      it("redirige s'il n'y a pas d'utilisateur connecté", async () => {
        const serveur = creeServeur(configurationDeTestDuServeur());

        const reponse = await request(serveur).get(`/${nomPage}`);

        expect(reponse.status).toBe(302);
        expect(reponse.headers.location).toBe('/connexion');
      });
    },
  );

  describe.each([
    { route: '/catalogue', vue: 'catalogue' },
    { route: '/jeux/1234', vue: 'jeux' },
    { route: '/cyber-en-jeux', vue: 'cyber-en-jeux' },
    { route: '/metiers/1234', vue: 'metiers' },
    { route: '/selection-enseignants', vue: 'selection-enseignants' },
    { route: '/selection-eleves', vue: 'selection-eleves' },
    { route: '/statistiques', vue: 'statistiques' },
    { route: '/accessibilite', vue: 'accessibilite' },
    { route: '/securite', vue: 'securite' },
    { route: '/evenements', vue: 'evenements' },
    { route: '/mentions-legales', vue: 'mentions-legales' },
    { route: '/confidentialite', vue: 'confidentialite' },
    { route: '/cgu', vue: 'cgu' },
    { route: '/a-propos', vue: 'a-propos' },
  ])('concernant la page $route', ({ route, vue }) => {
    it('renvoie la page', async () => {
      let vueRendue = '';
      const moteurDeRendu: MoteurDeRendu = {
        rends: (reponse, vue) => {
          vueRendue = vue;
          reponse.sendStatus(200);
        },
      };
      const serveur = creeServeur({
        ...configurationDeTestDuServeur(),
        moteurDeRendu,
      });

      const reponse = await request(serveur).get(route);

      expect(reponse.status).toBe(200);
      expect(vueRendue).toEqual(vue);
    });
  });
});
