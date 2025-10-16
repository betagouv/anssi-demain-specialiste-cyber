import { beforeEach, describe, expect, it } from 'vitest';
import { ConfigurationServeur } from '../../src/api/configurationServeur';
import { Express } from 'express';
import request from 'supertest';
import { configurationDeTestDuServeur } from './fauxObjets';
import { creeServeur } from '../../src/api/dsc';

describe('La ressource sélection enseignants', () => {
  let configuration: ConfigurationServeur;
  let serveur: Express;

  beforeEach(() => {
    configuration = configurationDeTestDuServeur();
    serveur = creeServeur(configuration);
  });

  describe('sur une demande GET', () => {
    it('renvoie un 200', async () => {
      const reponse = await request(serveur).get('/api/selection-enseignants');
      expect(reponse.status).toEqual(200);
    });
  });
});
