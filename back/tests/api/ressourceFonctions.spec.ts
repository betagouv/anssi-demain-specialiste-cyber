import { HttpStatusCode } from 'axios';
import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { EntrepôtFonctionsMémoire } from './entrepotFonctionsMemoire';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource des fonctions', () => {
  describe('sur requête GET', () => {
    let serveur: Express;
    let entrepôtFonctions: EntrepôtFonctionsMémoire;

    beforeEach(() => {
      const configurationServeur = configurationDeTestDuServeur();
      entrepôtFonctions = new EntrepôtFonctionsMémoire();
      serveur = creeServeur({
        ...configurationServeur,
        entrepôtFonctions,
      });
    });

    it('renvoie 200', async () => {
      const réponse = await request(serveur).get('/api/fonctions');

      expect(réponse.status).toBe(HttpStatusCode.Ok);
    });

    it('renvoie les fonctions', async () => {
      await entrepôtFonctions.ajoute({
        nom: 'Cryptologue',
        famille: 'Pilotage',
        missionPrincipale:
          'Met au point, avec des chercheurs du monde entier, des systèmes de chiffrement qui protègent nos usages numériques.',
        lien: 'https://www.onisep.fr/metier/des-metiers-qui-recrutent/les-metiers-de-la-cybersecurite/publication-les-metiers-de-la-cybersecurite',
        témoignage: {
          nom: 'Mélissa Rossi',
          femme: true,
          lien: 'https://messervices.cyber.gouv.fr/documents/onisep#page=11',
        },
      });
      await entrepôtFonctions.ajoute({
        nom: 'Analyste SOC',
        famille: 'Opérations',
        missionPrincipale: '',
        lien: '',
        témoignage: { nom: '', femme: false, lien: '' },
      });

      const réponse = await request(serveur).get('/api/fonctions');

      const corps = réponse.body;
      expect(corps).toHaveLength(2);
      expect(corps[0]).toStrictEqual({
        nom: 'Cryptologue',
        famille: 'Pilotage',
        missionPrincipale:
          'Met au point, avec des chercheurs du monde entier, des systèmes de chiffrement qui protègent nos usages numériques.',
        lien: 'https://www.onisep.fr/metier/des-metiers-qui-recrutent/les-metiers-de-la-cybersecurite/publication-les-metiers-de-la-cybersecurite',
        témoignage: {
          nom: 'Mélissa Rossi',
          femme: true,
          lien: 'https://messervices.cyber.gouv.fr/documents/onisep#page=11',
        },
      });
      expect(corps[1].nom).toBe('Analyste SOC');
    });
  });
});
