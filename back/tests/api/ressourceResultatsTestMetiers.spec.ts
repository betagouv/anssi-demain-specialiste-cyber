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
    let serveur: Express;
    let busEvenements: MockBusEvenement;
    const réponsesValides = [1, 2, 3, 4, 5];
    const suggestionsValides = [
      { correspondance: 0.69, nom: 'Cryptologue' },
      { correspondance: 0.67, nom: 'Analyste des cyber-menaces' },
    ];
    const corpsValide = { réponses: réponsesValides, suggestions: suggestionsValides };

    beforeEach(() => {
      busEvenements = new MockBusEvenement();
      serveur = creeServeur({ ...configurationDeTestDuServeur(), busEvenements });
    });

    describe('lorsque le corps est valide', () => {
      it('retourne 201', async () => {
        const réponse = await request(serveur).post('/api/resultats-test-metiers').send(corpsValide);

        expect(réponse.status).toBe(HttpStatusCode.Created);
      });

      it('émet un événement', async () => {
        await request(serveur).post('/api/resultats-test-metiers').send(corpsValide);

        busEvenements.aRecuUnEvenement(TestMétiersRéalisé);
        const événement = busEvenements.recupereEvenement(TestMétiersRéalisé)!;
        expect(événement.réponses).toStrictEqual(réponsesValides);
        expect(événement.suggestions).toStrictEqual([
          { correspondance: 0.69, nom: 'Cryptologue' },
          { correspondance: 0.67, nom: 'Analyste des cyber-menaces' },
        ]);
      });
    });

    describe('lorsque le corps est invalide', () => {
      it('à cause de l’absence des réponses', async () => {
        const réponse = await request(serveur).post('/api/resultats-test-metiers').send({
          suggestions: suggestionsValides,
        });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });

      it('à cause de l’absence des suggestions', async () => {
        const réponse = await request(serveur).post('/api/resultats-test-metiers').send({
          réponses: réponsesValides,
        });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });

      it('à cause d’un nombre insuffisant de réponses', async () => {
        const réponse = await request(serveur)
          .post('/api/resultats-test-metiers')
          .send({
            réponses: [1, 2],
            suggestions: suggestionsValides,
          });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });

      it('à cause d’un trop grand nombre de réponses', async () => {
        const réponse = await request(serveur)
          .post('/api/resultats-test-metiers')
          .send({
            réponses: [1, 2, 3, 4, 5, 6],
            suggestions: suggestionsValides,
          });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });

      it('lorsque les réponses ne sont pas des nombres', async () => {
        const réponse = await request(serveur)
          .post('/api/resultats-test-metiers')
          .send({
            réponses: ['a', 'b', 'c', 'd', 'e'],
            suggestions: suggestionsValides,
          });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });

      it('lorsque la correspondance n’est pas un nombre', async () => {
        const réponse = await request(serveur)
          .post('/api/resultats-test-metiers')
          .send({
            réponses: réponsesValides,
            suggestions: [
              {
                correspondance: 'ab',
                nom: 'Cryptologue',
              },
            ],
          });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });

      it('lorsque la correspondance est inférieur à 0', async () => {
        const réponse = await request(serveur)
          .post('/api/resultats-test-metiers')
          .send({
            réponses: réponsesValides,
            suggestions: [
              {
                correspondance: -1,
                nom: 'Cryptologue',
              },
            ],
          });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });

      it('lorsque la correspondance est supérieure à 1', async () => {
        const réponse = await request(serveur)
          .post('/api/resultats-test-metiers')
          .send({
            réponses: réponsesValides,
            suggestions: [
              {
                correspondance: 1.1,
                nom: 'Cryptologue',
              },
            ],
          });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });

      it('lorsque le nom de la suggestion est trop long', async () => {
        const réponse = await request(serveur)
          .post('/api/resultats-test-metiers')
          .send({
            réponses: réponsesValides,
            suggestions: [
              {
                correspondance: 0.5,
                nom: 'a'.repeat(101),
              },
            ],
          });

        expect(réponse.status).toBe(HttpStatusCode.BadRequest);
      });
    });
  });
});
