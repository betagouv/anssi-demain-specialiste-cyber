import { beforeEach, describe, expect, it } from 'vitest';
import { Express } from 'express';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { fabriqueMiddleware, Middleware } from '../../src/api/middleware';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import {
  configurationDeTestDuServeur,
  configurationServeurSansMiddleware,
} from './fauxObjets';
import { creeServeur } from '../../src/api/dsc';
import request from 'supertest';
import { Jeu } from '../../src/metier/jeu';
import { jeanneDupont } from './objetsPretsALEmploi';

describe('La ressource de tous les Jeux', () => {
  let serveur: Express;

  let entrepotJeux: EntrepotJeux;
  let middleware: Middleware;

  beforeEach(() => {
    entrepotJeux = new EntrepotJeuxMemoire();
    middleware = fabriqueMiddleware(configurationServeurSansMiddleware());
    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      middleware,
      entrepotJeux,
    });
  });

  describe('sur un GET', () => {
    it('retourne un 200', async () => {
      const reponse = await request(serveur).get('/api/jeux');

      expect(reponse.status).toEqual(200);
    });

    it('retourne la liste des jeux', async () => {
      await entrepotJeux.ajoute(
        new Jeu({
          id: '1',
          nom: 'cybercluedo',
          enseignant: jeanneDupont,
          sequence: 'heure',
          classe: 'cp',
          discipline: 'histoire-et-geographie',
          nomEtablissement: 'Lycée de la mer',
          eleves: ['Kevin', 'Branda'],
          categorie: 'simulation',
          thematiques: ['menace-cyber', 'orientation'],
          description: 'Une description',
        }),
      );

      const reponse = await request(serveur).get('/api/jeux');

      expect(reponse.body).toStrictEqual([
        {
          id: '1',
          nom: 'cybercluedo',
          niveau: 'Cycle 2 (CP-CE2)',
          categorie: 'simulation',
          thematiques: ['menace-cyber', 'orientation'],
          description: 'Une description',
          nomEtablissement: 'Lycée de la mer',
          eleves: ['Kevin', 'Branda'],
        },
      ]);
    });
  });
});
