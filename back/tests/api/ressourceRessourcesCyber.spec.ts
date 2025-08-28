import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { EntrepotRessourcesCyber } from '../../src/metier/entrepotRessourcesCyber';

describe('La ressource des ressources cyber', () => {
  let serveur: Express;
  let entrepotRessourcesCyber: EntrepotRessourcesCyber;

  beforeEach(() => {
    entrepotRessourcesCyber = {
      tous: async () => [
        {
          id: 'mon-id-ressource',
          titre: 'ressource 1',
        },
      ],
    };
    serveur = creeServeur({ entrepotRessourcesCyber });
  });

  describe('sur une demande GET', () => {
    it('renvoie un 200', async () => {
      const reponse = await request(serveur).get('/api/ressources-cyber');
      expect(reponse.status).toEqual(200);
    });

    it('renvoie une liste de ressources cyber', async () => {
      const reponse = await request(serveur).get('/api/ressources-cyber');

      expect(reponse.body).toEqual([
        {
          id: 'mon-id-ressource',
          titre: 'ressource 1',
        },
      ]);
    });
  });
});
