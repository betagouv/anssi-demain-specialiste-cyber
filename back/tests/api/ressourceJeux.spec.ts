import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { fabriqueMiddleware, Middleware } from '../../src/api/middleware';
import { JeuCree } from '../../src/bus/evenements/jeu/jeuCree';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import {
  fabriqueBusPourLesTests,
  MockBusEvenement,
} from '../bus/busPourLesTests';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import {
  configurationDeTestDuServeur,
  configurationServeurSansMiddleware,
} from './fauxObjets';
import { jeanneDupont } from './objetsPretsALEmploi';
import { Jeu } from '../../src/metier/jeu';
import { Utilisateur } from '../../src/metier/utilisateur';

describe('La ressource des jeux', () => {
  let serveur: Express;

  let entrepotJeux: EntrepotJeux;
  let busEvenements: MockBusEvenement;
  let middleware: Middleware;
  const ajouteUtilisateurARequeteMock = vi
    .fn()
    .mockImplementation((req, _res, suite) => {
      req.utilisateur = jeanneDupont;
      suite();
    });

  const corpsNouveauJeuValide = {
    nom: 'Cluedo',
    sequence: 'heure',
  };

  beforeEach(() => {
    entrepotJeux = new EntrepotJeuxMemoire();
    busEvenements = fabriqueBusPourLesTests();
    middleware = fabriqueMiddleware(configurationServeurSansMiddleware());
    middleware.ajouteUtilisateurARequete = () => ajouteUtilisateurARequeteMock;
    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      middleware,
      busEvenements,
      entrepotJeux,
    });
  });

  describe('sur un POST', () => {
    it("retourne un 201 si l'utilisateur est connecté", async () => {
      const reponse = await request(serveur)
        .post('/api/jeux')
        .send(corpsNouveauJeuValide);

      expect(reponse.status).toEqual(201);
    });

    it("retourne un 401 si il n'y a pas d'utilisateur connecté", async () => {
      ajouteUtilisateurARequeteMock.mockImplementationOnce(
        (_req, res, _suite) => {
          res.sendStatus(401);
        },
      );
      const reponse = await request(serveur)
        .post('/api/jeux')
        .send(corpsNouveauJeuValide);

      expect(reponse.status).toEqual(401);
    });

    it("ajoute un jeu dans l'entrepot des jeux", async () => {
      await request(serveur).post('/api/jeux').send(corpsNouveauJeuValide);

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux).toHaveLength(1);
    });

    it('peut fournir les informations sur le jeu', async () => {
      await request(serveur).post('/api/jeux').send(corpsNouveauJeuValide);

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux[0].id).toBeDefined();
      expect(mesJeux[0].nom).toEqual('Cluedo');
      expect(mesJeux[0].sequence).toEqual('heure');
    });

    it('publie un événement de création de jeu', async () => {
      await request(serveur).post('/api/jeux').send(corpsNouveauJeuValide);

      busEvenements.aRecuUnEvenement(JeuCree);
      const evenement = busEvenements.recupereEvenement(JeuCree);
      expect(evenement!.emailAuteur).toBe('jeanne.dupont@mail.com');
      expect(evenement!.nom).toBe('Cluedo');
      expect(evenement!.sequence).toBe('heure');
    });

    it("associe le jeu à l'utilisateur connecté", async () => {
      await request(serveur).post('/api/jeux').send(corpsNouveauJeuValide);

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux[0].enseignant?.email).toEqual('jeanne.dupont@mail.com');
    });

    describe('concernant la vérification du nom', () => {
      it('vérifie que le nom est fourni', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            nom: undefined,
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Le nom est obligatoire');
      });

      it("vérifie que le nom n'est pas vide", async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({ ...corpsNouveauJeuValide, nom: '   ' });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Le nom est obligatoire');
      });
    });

    describe('concernant la vérification de la séquence', () => {
      it('vérifie que la séquence est fournie', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            sequence: undefined,
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La séquence est invalide');
      });

      it("vérifie que la séquence n'est pas vide", async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            sequence: '      ',
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La séquence est invalide');
      });

      it('vérifie que la séquence fait partie des valeurs attendues', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            sequence: 'mauvaise-sequence',
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La séquence est invalide');
      });
    });
  });

  describe('sur un GET', () => {
    it('retourne un 200 si l’utilisateur est connecté', async () => {
      const reponse = await request(serveur).get('/api/jeux');

      expect(reponse.status).toEqual(200);
    });

    it("retourne un 401 si il n'y a pas d'utilisateur connecté", async () => {
      ajouteUtilisateurARequeteMock.mockImplementationOnce(
        (_req, res, _suite) => {
          res.sendStatus(401);
        },
      );
      const reponse = await request(serveur).get('/api/jeux');

      expect(reponse.status).toEqual(401);
    });

    it('retourne la liste des jeux', async () => {
      await entrepotJeux.ajoute(
        new Jeu({
          id: '1',
          nom: 'cybercluedo',
          enseignant: jeanneDupont,
          sequence: 'heure',
        }),
      );

      const reponse = await request(serveur).get('/api/jeux');

      expect(reponse.body).toStrictEqual([{ id: '1', nom: 'cybercluedo' }]);
    });

    it("retourne la liste des jeux de l'utilisateur connecté", async () => {
      const patrickDurand = new Utilisateur({
        email: 'patrick.durand@mail.com',
        infolettreAcceptee: true,
        prenom: '',
        nom: '',
        siretEntite: '',
      });

      await entrepotJeux.ajoute(
        new Jeu({
          id: '1',
          nom: 'cybercluedo',
          enseignant: patrickDurand,
          sequence: 'heure',
        }),
      );
      await entrepotJeux.ajoute(
        new Jeu({
          id: '2',
          nom: 'cyberuno',
          enseignant: jeanneDupont,
          sequence: 'heure',
        }),
      );

      const reponse = await request(serveur).get('/api/jeux');

      expect(reponse.body).toStrictEqual([{ id: '2', nom: 'cyberuno' }]);
    });
  });
});
