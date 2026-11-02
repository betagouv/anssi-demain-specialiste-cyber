import { HttpStatusCode } from 'axios';
import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { TestMétiersRéalisé } from '../../src/bus/evenements/TestMetiersRealise';
import { MockBusEvenement } from '../bus/busPourLesTests';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource des résultats du test des métiers', () => {
  describe('sur un POST', () => {
    describe('lorsque le corps est valide', () => {
      let serveur: Express;
      let busEvenements: MockBusEvenement;

      beforeEach(() => {
        busEvenements = new MockBusEvenement();
        serveur = creeServeur({ ...configurationDeTestDuServeur(), busEvenements });
      });

      it('retourne 201', async () => {
        const réponse = await request(serveur).post('/api/resultats-test-metiers').send({});

        expect(réponse.status).toBe(HttpStatusCode.Created);
      });

      it('émet un événement', async () => {
        await request(serveur)
          .post('/api/resultats-test-metiers')
          .send({
            réponses: [1, 2, 3, 4, 5],
            suggestions: [
              { correspondance: 0.69, nom: 'Cryptologue' },
              { correspondance: 0.67, nom: 'Analyste des cyber-menaces' },
            ],
          });

        busEvenements.aRecuUnEvenement(TestMétiersRéalisé);
        const événement = busEvenements.recupereEvenement(TestMétiersRéalisé)!;
        expect(événement.réponses).toStrictEqual([1, 2, 3, 4, 5]);
        expect(événement.suggestions).toStrictEqual([
          { correspondance: 0.69, nom: 'Cryptologue' },
          { correspondance: 0.67, nom: 'Analyste des cyber-menaces' },
        ]);
      });
    });
  });
});
