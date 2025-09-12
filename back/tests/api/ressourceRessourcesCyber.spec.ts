import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { ConfigurationServeur } from '../../src/api/configurationServeur';
import { creeServeur } from '../../src/api/dsc';
import { RessourceCyber } from '../../src/metier/ressourceCyber';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource des ressources cyber', () => {
  let configuration: ConfigurationServeur;
  let serveur: Express;

  beforeEach(() => {
    configuration = configurationDeTestDuServeur();
    serveur = creeServeur(configuration);
  });

  describe('sur une demande GET', () => {
    it('renvoie un 200', async () => {
      const reponse = await request(serveur).get('/api/ressources-cyber');
      expect(reponse.status).toEqual(200);
    });

    it('renvoie une liste de ressources cyber', async () => {
      configuration.entrepotRessourcesCyber.ajoute({
        id: 1,
        niveaux: ['niveau 1', 'niveau 2'],
        publicsCible: ['Parents'],
        thematiques: ['theme 1', 'theme 2'],
        titre: 'ressource 1',
        types: ['type1', 'type2'],
        besoins: ['besoin 1', 'besoin 2'],
        description: 'La ressource 1',
      });

      const reponse = await request(serveur).get('/api/ressources-cyber');

      expect(reponse.body).toStrictEqual<RessourceCyber[]>([
        {
          id: 1,
          niveaux: ['niveau 1', 'niveau 2'],
          publicsCible: ['Parents'],
          thematiques: ['theme 1', 'theme 2'],
          titre: 'ressource 1',
          types: ['type1', 'type2'],
          besoins: ['besoin 1', 'besoin 2'],
          description: 'La ressource 1',
        },
      ]);
    });
  });
});
