import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { fabriqueMiddleware, Middleware } from '../../src/api/middleware';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import { unJeu } from '../metier/constructeurJeu';
import {
  configurationDeTestDuServeur,
  configurationServeurSansMiddleware,
} from './fauxObjets';
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
        unJeu()
          .avecUnId('1')
          .avecUnNom('cybercluedo')
          .avecUneDescription('Une description')
          .deClasse('cp')
          .deCategorie('simulation')
          .avecLesThematiques(['menace-cyber', 'orientation'])
          .deEnseignant(jeanneDupont)
          .avecEleves(['Kevin', 'Branda'])
          .dansEtablissement('Lycée de la mer')
          .avecUneCouverture('une-couverture')
          .avecUnePhoto('photo-1')
          .avecUnePhoto('photo-2')
          .avecUneReaction('🔥', 3)
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
          nomEtablissement: 'Lycée de la mer',
          eleves: ['Kevin', 'Branda'],
          photos: {
            couverture: {
              chemin: 'une-couverture',
            },
            photos: [{ chemin: 'photo-1' }, { chemin: 'photo-2' }],
          },
          reactions: { '🔥': 3 },
        },
      ]);
    });

    it('ne retourne pas les jeux cachés', async () => {
      await entrepotJeux.ajoute(
        unJeu()
          .avecUnId('1')
          .avecUnNom('cybercluedo')
          .avecUneDescription('Une description')
          .deClasse('cp')
          .deCategorie('simulation')
          .avecLesThematiques(['menace-cyber', 'orientation'])
          .deEnseignant(jeanneDupont)
          .avecEleves(['Kevin', 'Branda'])
          .dansEtablissement('Lycée de la mer')
          .avecUneCouverture('une-couverture')
          .avecUnePhoto('photo-1')
          .avecUnePhoto('photo-2')
          .construis(),
      );

      await entrepotJeux.ajoute(
        unJeu()
          .avecUnId('2')
          .avecUnNom('cybercluedo2')
          .avecUneDescription('Une description 2')
          .deClasse('cp')
          .deCategorie('simulation')
          .avecLesThematiques(['menace-cyber', 'orientation'])
          .deEnseignant(jeanneDupont)
          .avecEleves(['Kevin', 'Branda'])
          .dansEtablissement('Lycée de la mer')
          .avecUneCouverture('une-couverture')
          .avecUnePhoto('photo-1')
          .avecUnePhoto('photo-2')
          .cache(true)
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
          nomEtablissement: 'Lycée de la mer',
          eleves: ['Kevin', 'Branda'],
          photos: {
            couverture: {
              chemin: 'une-couverture',
            },
            photos: [{ chemin: 'photo-1' }, { chemin: 'photo-2' }],
          },
          reactions: {},
        },
      ]);
    });
  });
});
