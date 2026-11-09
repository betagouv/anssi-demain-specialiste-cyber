import { HttpStatusCode } from 'axios';
import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { FamilleDeMétier } from '../../src/metier/familleDeMetier';
import { unMetier } from '../metier/constructeurMetier';
import { EntrepôtFamillesDeMétierMémoire } from './entrepotFamillesDeMetierMemoire';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource des familles de métier', () => {
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
    it('renvoie 200', async () => {
      const réponse = await request(serveur).get('/api/familles-metier');

      expect(réponse.status).toBe(HttpStatusCode.Ok);
    });

    it('renvoie les familles', async () => {
      await entrepôtFamillesDeMétier.ajoute(
        new FamilleDeMétier({
          numéro: 1,
          code: 'Pilotage',
          titre: 'Gestion de la sécurité et pilotage des projets de sécurité',
          sousTitre:
            'Définir, coordonner, sensibiliser : les métiers de celles et ceux qui fixent le cap de la cybersécurité.',
          description: "Une organisation bien protégée a besoin d'un cap...",
          rôles: [
            {
              nom: 'Définir',
              description: "Fixer la stratégie et les règles de sécurité de l'organisation.",
            },
            {
              nom: 'Coordonner',
              description: 'Piloter les projets et faire travailler ensemble technique et métiers.',
            },
          ],
        }),
      );
      await entrepôtFamillesDeMétier.ajoute(
        new FamilleDeMétier({
          numéro: 2,
          code: 'Conception',
          titre: '',
          sousTitre: '',
          description: '',
          rôles: [],
        }),
      );

      const réponse = await request(serveur).get('/api/familles-metier');

      const corps = réponse.body;
      expect(corps).toHaveLength(2);
      const premièreFamille = corps[0];
      expect(premièreFamille.code).toBe('Pilotage');
      expect(premièreFamille.titre).toBe('Gestion de la sécurité et pilotage des projets de sécurité');
      expect(premièreFamille.sousTitre).toBe(
        'Définir, coordonner, sensibiliser : les métiers de celles et ceux qui fixent le cap de la cybersécurité.',
      );
      expect(premièreFamille.description).toBe("Une organisation bien protégée a besoin d'un cap...");
      expect(premièreFamille.rôles).toStrictEqual([
        {
          nom: 'Définir',
          description: "Fixer la stratégie et les règles de sécurité de l'organisation.",
        },
        {
          nom: 'Coordonner',
          description: 'Piloter les projets et faire travailler ensemble technique et métiers.',
        },
      ]);

      expect(corps[1].code).toBe('Conception');
    });

    it('n’expose pas l’id interne des métiers', async () => {
      await entrepôtFamillesDeMétier.ajoute(
        new FamilleDeMétier({
          numéro: 1,
          code: 'Pilotage',
          titre: '',
          sousTitre: '',
          description: '',
          rôles: [],
          profils: [unMetier().avecIdInterne(8).construis()],
        }),
      );

      const réponse = await request(serveur).get('/api/familles-metier');

      const corps = réponse.body;
      expect(corps[0].profils[0].idInterne).toBeUndefined();
    });
  });
});
