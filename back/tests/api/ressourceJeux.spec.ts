import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';
import { creeServeur } from '../../src/api/dsc';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import { encodeSession } from './cookie';
import { configurationDeTestDuServeur, fauxAdaptateurJWT } from './fauxObjets';
import {
  fabriqueBusPourLesTests,
  MockBusEvenement,
} from '../bus/busPourLesTests';
import { JeuCree } from '../../src/bus/evenements/jeu/jeuCree';
import { EntrepotUtilisateur } from '../../src/metier/entrepotUtilisateur';
import { EntrepotUtilisateurMemoire } from '../infra/entrepotUtilisateurMemoire';
import { jeanneDupont } from './objetsPretsALEmploi';

describe('La ressource des jeux', () => {
  let serveur: Express;
  let adaptateurJWT: AdaptateurJWT;
  let entrepotJeux: EntrepotJeux;
  let entrepotUtilisateur: EntrepotUtilisateur;
  let busEvenements: MockBusEvenement;

  beforeEach(() => {
    entrepotJeux = new EntrepotJeuxMemoire();
    entrepotUtilisateur = new EntrepotUtilisateurMemoire();
    adaptateurJWT = { ...fauxAdaptateurJWT };
    busEvenements = fabriqueBusPourLesTests();
    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      adaptateurJWT,
      busEvenements,
      entrepotJeux,
      entrepotUtilisateur,
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
      const reponse = await request(serveur)
        .post('/api/jeux')
        .send({ nom: 'Cluedo' });

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

    it('publie un événement de création de jeu', async () => {
      adaptateurJWT.decode = () => ({
        email: 'jeanne.dupont@mail.com',
      });

      await request(serveur).post('/api/jeux').send({ nom: 'cybercluedo' });

      busEvenements.aRecuUnEvenement(JeuCree);
      const evenement = busEvenements.recupereEvenement(JeuCree);
      expect(evenement!.emailAuteur).toBe('jeanne.dupont@mail.com');
      expect(evenement!.nom).toBe('cybercluedo');
    });

    it("associe le jeu à l'utilisateur connecté", async () => {
      adaptateurJWT.decode = () => ({
        email: 'jeanne.dupont@mail.com',
      });
      await entrepotUtilisateur.ajoute(jeanneDupont);

      await request(serveur).post('/api/jeux').send({ nom: 'Cluedo' });

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux[0].enseignant?.email).toEqual('jeanne.dupont@mail.com');
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
