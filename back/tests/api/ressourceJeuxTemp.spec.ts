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
import { jeanneDupont } from './objetsPretsALEmploi';
import { unJeu } from '../metier/construteurJeu';

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
        unJeu()
          .avecUnId('1')
          .avecUnNom('cybercluedo')
          .avecUneDescription('Une description')
          .deClasse('cp')
          .deCategorie('simulation')
          .avecLesThematiques(['menace-cyber', 'orientation'])
          .deEnseignant(jeanneDupont)
          .construis(),
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
        },
      ]);
    });
  });
});
