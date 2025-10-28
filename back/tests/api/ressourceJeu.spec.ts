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

    it("retourne un 404 lorsque le jeu n'existe pas", async () => {
      const reponse = await request(serveur).patch('/api/jeux/1234').send({
        estCache: true,
      });
      expect(reponse.status).toEqual(404);
    });

    it('modifie la visibilité du jeu', async () => {
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

      const jeuModifie = await entrepotJeux.parId('1');
      expect(jeuModifie!.estCache).toBe(true);
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

    it('ne modifie rien si le corps est vide', async () => {
      const reponse = await request(serveur).patch('/api/jeux/1').send({});

      expect(reponse.status).toBe(200);
      const jeuModifie = await entrepotJeux.parId('1');
      expect(jeuModifie).toStrictEqual(cybercluedo);
    });

    it('modifie un jeu', async () => {
      const reponse = await request(serveur)
        .patch('/api/jeux/1')
        .send({
          nomEtablissement: 'Nouveau nom etablissement',
          sequence: 'demi-journee',
          eleves: ['Martin', 'Sophie'],
          discipline: 'francais',
          classe: 'cm2',
          nom: 'Nouveau nom du jeu',
          categorie: 'jeu-plateau',
          thematiques: ['cyberharcelement', 'gestion-crise-cyber'],
          description: 'Nouvelle description',
          consentement: true,
          temoignages: [
            {
              prenom: 'Joséphine',
              details: "C'était super !",
            },
          ],
        });

      expect(reponse.status).toBe(200);

      const jeuModifie = (await entrepotJeux.parId('1'))!;
      expect(jeuModifie.nomEtablissement).toBe('Nouveau nom etablissement');
      expect(jeuModifie.sequence).toBe('demi-journee');
      expect(jeuModifie.eleves).toEqual(['Martin', 'Sophie']);
      expect(jeuModifie.discipline).toBe('francais');
      expect(jeuModifie.classe).toBe('cm2');
      expect(jeuModifie.nom).toBe('Nouveau nom du jeu');
      expect(jeuModifie.categorie).toBe('jeu-plateau');
      expect(jeuModifie.thematiques).toEqual([
        'cyberharcelement',
        'gestion-crise-cyber',
      ]);
      expect(jeuModifie.description).toBe('Nouvelle description');
      expect(jeuModifie.consentement).toBe(true);
      expect(jeuModifie.temoignages).toEqual([
        {
          prenom: 'Joséphine',
          details: "C'était super !",
        },
      ]);
    });

    describe('concernant les propriétés fournies', () => {
      it("vérifie que le nom d'établissement est non vide", async () => {
        const reponse = await request(serveur).patch('/api/jeux/1').send({
          nomEtablissement: '',
        });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual(
          "Le nom de l'établissement est obligatoire",
        );
      });

      it('vérifie que le nom du jeu est non vide', async () => {
        const reponse = await request(serveur).patch('/api/jeux/1').send({
          nom: '',
        });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual('Le nom est obligatoire');
      });

      it('vérifie que la discipline est valide', async () => {
        const reponse = await request(serveur).patch('/api/jeux/1').send({
          discipline: '',
        });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual('La discipline est invalide');
      });

      it('vérifie que la classe est valide', async () => {
        const reponse = await request(serveur).patch('/api/jeux/1').send({
          classe: '',
        });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual('La classe est invalide');
      });

      it('vérifie que la séquence est valide', async () => {
        const reponse = await request(serveur).patch('/api/jeux/1').send({
          sequence: '',
        });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual('La séquence est invalide');
      });

      it('vérifie que la catégorie est valide', async () => {
        const reponse = await request(serveur).patch('/api/jeux/1').send({
          categorie: '',
        });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual('La catégorie est invalide');
      });

      it('vérifie que la description est non vide', async () => {
        const reponse = await request(serveur).patch('/api/jeux/1').send({
          description: '',
        });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual('La description est obligatoire');
      });

      it('vérifie que la description ne dépasse pas 8000 caractères', async () => {
        const reponse = await request(serveur)
          .patch('/api/jeux/1')
          .send({
            description: 'a'.repeat(8001),
          });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual(
          'La description ne peut contenir que 8000 caractères maximum',
        );
      });

      it("vérifie que le prénom des témoignages n'est pas vide", async () => {
        const reponse = await request(serveur)
          .patch('/api/jeux/1')
          .send({
            temoignages: [{ prenom: '', details: 'Détails' }],
          });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual(
          'Le prénom est obligatoire dans un témoignage',
        );
      });

      it('vérifie que les détails des témoignages ne sont pas vides', async () => {
        const reponse = await request(serveur)
          .patch('/api/jeux/1')
          .send({
            temoignages: [{ prenom: 'Martin', details: '' }],
          });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual(
          'Les détails sont obligatoires dans un témoignage',
        );
      });

      it('vérifie que les détails des témoignages ne dépassent pas 8000 caractères', async () => {
        const reponse = await request(serveur)
          .patch('/api/jeux/1')
          .send({
            temoignages: [{ prenom: 'Martin', details: 'a'.repeat(8001) }],
          });

        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toEqual(
          'Les détails ne peuvent excéder 8000 caractères',
        );
      });
    });
  });
});
