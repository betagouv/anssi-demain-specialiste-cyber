import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { ConfigurationServeur } from '../../src/api/configurationServeur';
import { creeServeur } from '../../src/api/dsc';
import { unMetier } from '../metier/constructeurMetier';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource de la liste des métiers', () => {
  describe('sur requête GET', () => {
    let serveur: Express;
    let configurationServeur: ConfigurationServeur;

    beforeEach(() => {
      configurationServeur = configurationDeTestDuServeur();
      serveur = creeServeur(configurationServeur);
    });

    it('renvoie 200 ', async () => {
      const réponse = await request(serveur).get('/api/metiers');

      expect(réponse.status).toBe(200);
    });

    it('renvoie tous les métiers', async () => {
      const premier = unMetier().avecId(1).avecTitre('Premier métier').construis();
      const second = unMetier().avecId(2).avecTitre('Second métier').construis();
      await configurationServeur.entrepotMetier.ajoute(premier);
      await configurationServeur.entrepotMetier.ajoute(second);

      const réponse = await request(serveur).get('/api/metiers');

      expect(réponse.status).toBe(200);
      expect(réponse.body).toHaveLength(2);
      expect(réponse.body[0].titre).toBe('Premier métier');
      expect(réponse.body[1].titre).toBe('Second métier');
    });
  });
});
