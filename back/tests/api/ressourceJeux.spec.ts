import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import { configurationDeTestDuServeur, fauxAdaptateurJWT } from './fauxObjets';
import { encodeSession } from './cookie';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';

describe('La ressource des jeux', () => {
  let serveur: Express;
  let adaptateurJWT: AdaptateurJWT;
  let entrepotJeux: EntrepotJeux;

  beforeEach(() => {
    entrepotJeux = new EntrepotJeuxMemoire();
    adaptateurJWT = { ...fauxAdaptateurJWT };
    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      adaptateurJWT,
      entrepotJeux,
    });
  });

  describe('sur un POST', () => {
    it("retourne un 201 si l'utilisateur est connecté", async () => {
      const cookie = encodeSession({
        email: 'jeanne.dupont@mail.com',
      });

      const reponse = await request(serveur)
        .post('/api/jeux')
        .set('Cookie', [cookie])
        .send({ nom: 'Cluedo' });

      expect(reponse.status).toEqual(201);
    });

    it("retourne un 401 si il n'y a pas d'utilisateur connecté", async () => {
      adaptateurJWT.decode = () => {
        throw new Error('erreur de décodage');
      };
      const reponse = await request(serveur).post('/api/jeux').send({ nom: 'Cluedo' });

      expect(reponse.status).toEqual(401);
    });

    it("ajoute un jeu dans l'entrepot des jeux", async () => {
      await request(serveur).post('/api/jeux').send({ nom: 'Cluedo' });

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux).toHaveLength(1);
    });

    it('peut fournir les informations sur le jeu', async () => {
      await request(serveur).post('/api/jeux').send({ nom: 'cybercluedo' });

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux[0].id).toBeDefined();
      expect(mesJeux[0].nom).toEqual('cybercluedo');
    });

    describe('concernant la vérification du nom', () => {
      it('vérifie que le nom est fourni', async () => {
        const reponse = await request(serveur).post('/api/jeux').send({});

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Le nom est obligatoire');
      });

      it("vérifie que le nom n'est pas vide", async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({ nom: '   ' });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Le nom est obligatoire');
      });
    });
  });
});
