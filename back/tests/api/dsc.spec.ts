import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';
import { creeServeur } from '../../src/api/dsc';
import { MoteurDeRendu } from '../../src/api/moteurDeRendu';
import { encodeSession } from './cookie';
import { configurationDeTestDuServeur, fauxAdaptateurJWT } from './fauxObjets';

describe("L'API DSC", () => {
  describe('concernant la limitation de trafic', () => {
    const creeServeurAvecLimiteDeRequetes = (maxRequetesParMinute: number) =>
      creeServeur({
        ...configurationDeTestDuServeur(),
        serveurLab: {
          reseau: {
            trustProxy: 0,
            ipAutorisees: false,
            maxRequetesParMinute,
          },
        },
      });

    it('respecte une limite', async () => {
      const serveur = creeServeurAvecLimiteDeRequetes(1);
      const requete = request(serveur);
      await requete.get('/');

      const reponse = await requete.get('/');

      expect(reponse.status).toEqual(429);
    });

    it('utilise la configuration', async () => {
      const serveur = creeServeurAvecLimiteDeRequetes(2);
      const requete = request(serveur);
      await requete.get('/');

      const reponse = await requete.get('/');

      expect(reponse.status).toEqual(200);
    });
  });

  describe('concernant les pages protégées', () => {
    let serveur: Express;

    const moteurDeRendu: MoteurDeRendu = {
      rends: vi.fn().mockImplementation((reponse) => reponse.sendStatus(200)),
    };
    beforeEach(() => {
      const adaptateurJWT: AdaptateurJWT = {
        ...fauxAdaptateurJWT,
        decode: (jeton?: string) => {
          if (!jeton) {
            throw new Error();
          }
          return {};
        },
      };
      serveur = creeServeur({
        ...configurationDeTestDuServeur(),
        adaptateurJWT,
        moteurDeRendu,
      });
    });
    it("redirige vers la connexion lorsqu'on est pas connecté", async () => {
      const reponse = await request(serveur).get('/nouveau-jeu');

      expect(reponse.status).toEqual(302);
      expect(reponse.headers.location).toEqual('/connexion');
    });

    it('rends la page quand on est connecté', async () => {
      const cookie = encodeSession({
        token: 'jeton de test',
      });

      const reponse = await request(serveur)
        .get('/nouveau-jeu')
        .set('Cookie', [cookie]);

      expect(reponse.status).toEqual(200);
      expect(moteurDeRendu.rends).toHaveBeenCalledExactlyOnceWith(
        expect.any(Object),
        'nouveau-jeu',
      );
    });
  });
});
