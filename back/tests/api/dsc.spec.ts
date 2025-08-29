import { describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import request from 'supertest';
import { configurationDeTestDuServeur } from './fauxObjets';

describe("L'API DSC", () => {
  describe('concernant la limitation de trafic', () => {
    const creeServeurAvecLimiteDeRequetes = (maxRequetesParMinute: number) =>
      creeServeur({
        ...configurationDeTestDuServeur,
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
});
