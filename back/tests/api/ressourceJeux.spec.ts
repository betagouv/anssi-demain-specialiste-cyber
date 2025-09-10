import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource des jeux', () => {
  let serveur: Express;
  let entrepotJeux: EntrepotJeux;

  beforeEach(() => {
    entrepotJeux = new EntrepotJeuxMemoire();
    serveur = creeServeur({ ...configurationDeTestDuServeur(), entrepotJeux });
  });

  describe('sur un POST', () => {
    it('retourne un 201', async () => {
      const reponse = await request(serveur).post('/api/jeux').send();

      expect(reponse.status).toEqual(201);
    });

    it("ajoute un jeu dans l'entrepot des jeux", async () => {
      await request(serveur).post('/api/jeux').send();

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux).toHaveLength(1);
    });

    it('peut fournir les informations sur le jeu', async () => {
      await request(serveur).post('/api/jeux').send({ nom: 'cybercluedo' });

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux[0]).toStrictEqual({ nom: 'cybercluedo' });
    });
  });
});
