import { HttpStatusCode } from 'axios';
import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { FamilleDeMétier } from '../../src/metier/familleDeMetier';
import { EntrepôtFamillesDeMétierMémoire } from './entrepotFamillesDeMetierMemoire';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource d’une famille de métier', () => {
  let serveur: Express;
  let entrepôtFamillesDeMétier: EntrepôtFamillesDeMétierMémoire;

  beforeEach(() => {
    const configurationServeur = configurationDeTestDuServeur();
    entrepôtFamillesDeMétier = new EntrepôtFamillesDeMétierMémoire();
    serveur = creeServeur({
      ...configurationServeur,
      entrepôtFamillesDeMétier,
    });
  });

  describe('sur requête GET', () => {
    it('renvoie la famille correspondant au code slugifié', async () => {
      await entrepôtFamillesDeMétier.ajoute(
        new FamilleDeMétier({
          code: 'Incidents et crises',
          titre: 'Gestion des incidents et des crises de sécurité',
          sousTitre: 'Surveiller, détecter, enquêter, réagir.',
          description: "Aucune organisation n'est à l'abri.",
          rôles: [{ nom: 'Détecter', description: 'Surveiller les systèmes.' }],
        }),
      );

      const réponse = await request(serveur).get('/api/familles-metier/incidents-et-crises');

      expect(réponse.status).toBe(HttpStatusCode.Ok);
      expect(réponse.body.code).toBe('Incidents et crises');
      expect(réponse.body.titre).toBe('Gestion des incidents et des crises de sécurité');
    });

    it('renvoie 404 si le code ne correspond à aucune famille', async () => {
      const réponse = await request(serveur).get('/api/familles-metier/inexistant');

      expect(réponse.status).toBe(HttpStatusCode.NotFound);
    });
  });
});
