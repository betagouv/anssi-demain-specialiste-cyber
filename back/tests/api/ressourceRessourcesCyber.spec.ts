import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { configurationDeTestDuServeur } from './fauxObjets';
import { RessourceCyber } from '../../src/metier/ressourceCyber';

describe('La ressource des ressources cyber', () => {
  let serveur: Express;

  beforeEach(() => {
    serveur = creeServeur(configurationDeTestDuServeur);
  });

  describe('sur une demande GET', () => {
    it('renvoie un 200', async () => {
      const reponse = await request(serveur).get('/api/ressources-cyber');
      expect(reponse.status).toEqual(200);
    });

    it('renvoie une liste de ressources cyber', async () => {
      const reponse = await request(serveur).get('/api/ressources-cyber');

      expect(reponse.body).toStrictEqual<RessourceCyber[]>([
        {
          id: 1,
          titre: 'ressource 1',
        },
      ]);
    });
  });
});
