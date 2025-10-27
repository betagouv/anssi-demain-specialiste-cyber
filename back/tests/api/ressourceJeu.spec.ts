import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { fabriqueMiddleware, Middleware } from '../../src/api/middleware';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import {
  configurationDeTestDuServeur,
  configurationServeurSansMiddleware,
} from './fauxObjets';
import { cybercluedo, hectorDurant, jeanneDupont } from './objetsPretsALEmploi';

describe('La ressource des jeux', () => {
  let serveur: Express;
  let entrepotJeux: EntrepotJeux;

  let middleware: Middleware;
  const ajouteUtilisateurARequeteMock = vi
    .fn()
    .mockImplementation((req, _res, suite) => {
      req.utilisateur = jeanneDupont;
      suite();
    });

  beforeEach(async () => {
    entrepotJeux = new EntrepotJeuxMemoire();
    await entrepotJeux.ajoute(cybercluedo);
    middleware = fabriqueMiddleware(configurationServeurSansMiddleware());
    middleware.ajouteUtilisateurARequete = () => ajouteUtilisateurARequeteMock;
    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      middleware,
      entrepotJeux,
    });
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
        consentement: false,
        reactions: {},
        estCache: false,
      });
    });
  });

  describe('sur un PATCH', () => {
    it('retourne un 200', async () => {
      const reponse = await request(serveur).patch('/api/jeux/1').send({
        estCache: true,
      });

      expect(reponse.status).toEqual(200);
    });

    it("retourne un 404 lorsque le jeu n'éxiste pas", async () => {
      const reponse = await request(serveur).patch('/api/jeux/1234').send({
        estCache: true,
      });
      expect(reponse.status).toEqual(404);
    });

    it('modifie les données du jeu', async () => {
      const reponse = await request(serveur).patch('/api/jeux/1').send({
        estCache: true,
      });

      const {
        decrementeReaction: _d,
        incrementeReaction: _i,
        enseignant,
        ...rest
      } = cybercluedo;
      expect(reponse.body).toEqual({
        ...rest,
        enseignant: enseignant?.prenom,
        estCache: true,
      });
    });

    it('interdit la modification de champs non modifiables', async () => {
      const reponse = await request(serveur).patch('/api/jeux/1').send({
        estCache: true,
        nomEtablissement: 'Nouveau nom etablissement',
      });
      expect(reponse.status).toEqual(400);
    });

    it("interdit la modification d'un jeu qui ne nous appartient pas", async () => {
      ajouteUtilisateurARequeteMock.mockImplementationOnce(
        (req, _res, suite) => {
          req.utilisateur = hectorDurant;
          suite();
        },
      );
      const reponse = await request(serveur).patch('/api/jeux/1').send({
        estCache: true,
      });
      expect(reponse.status).toEqual(403);
    });

    it("interdit la modification d'un jeu si l'utilisateur est inconnu", async () => {
      ajouteUtilisateurARequeteMock.mockImplementationOnce(
        (req, _res, suite) => {
          req.utilisateur = undefined;
          suite();
        },
      );
      const reponse = await request(serveur).patch('/api/jeux/1').send({
        estCache: true,
      });
      expect(reponse.status).toEqual(403);
    });
  });
});
