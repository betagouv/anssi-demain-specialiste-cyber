import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { creeServeur } from '../../src/api/dsc';
import { configurationDeTestDuServeur } from './fauxObjets';
import { encodeSession } from './cookie';

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
});
