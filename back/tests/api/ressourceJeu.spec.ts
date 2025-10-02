import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import { configurationDeTestDuServeur } from './fauxObjets';
import { cybercluedo } from './objetsPretsALEmploi';

describe('La ressource des jeux', () => {
  let serveur: Express;
  let entrepotJeux: EntrepotJeux;

  beforeEach(async () => {
    entrepotJeux = new EntrepotJeuxMemoire();
    await entrepotJeux.ajoute(cybercluedo);
    serveur = creeServeur({ ...configurationDeTestDuServeur(), entrepotJeux });
  });

  describe('sur un GET', () => {
    it('retourne un 200', async () => {
      const reponse = await request(serveur).get('/api/jeux/1');

      expect(reponse.status).toEqual(200);
    });

    it("retourne un 404 lorsque le jeu n'éxiste pas", async () => {
      const reponse = await request(serveur).get('/api/jeux/1234');

      expect(reponse.status).toEqual(404);
    });

    it("renvoie les détails d'un jeu", async () => {
      const reponse = await request(serveur).get('/api/jeux/1');

      expect(reponse.body).toStrictEqual({
        id: '1',
        nom: 'cybercluedo',
        enseignant: 'Jeanne',
        sequence: 'heure',
        classe: 'cp',
        discipline: 'histoire-et-geographie',
        nomEtablissement: 'Lycée de la mer',
        eleves: [],
        categorie: 'simulation',
        temoignages: [],
        thematiques: ['menace-cyber', 'orientation'],
        description: 'Une description',
        photos: {
          couverture: {
            chemin: 'un-chemin',
          },
          photos: [],
        },
      });
    });
  });
});
