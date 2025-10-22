import { describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { configurationDeTestDuServeur } from './fauxObjets';
import request from 'supertest';

describe("La ressource des réactions d'un jeu", () => {
  describe('sur un POST', () => {
    it('retourne un 200', async() => {
      const serveur = creeServeur(configurationDeTestDuServeur());

      const reponse = await request(serveur).post('/api/jeux/2/reactions');

      const statut = reponse.status;
      expect(statut).toEqual(200);
    });
  });
});
