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
    nomEtablissement: 'Lycée de la mer',
    discipline: 'mathematiques',
    classe: 'cp',
    eleves: ['Gontran'],
    categorie: 'simulation',
    thematiques: ['menace-cyber', 'orientation'],
    description: 'Un texte descriptif du jeu',
    temoignages: [
      {
        prenom: 'Jean',
        details: 'Un premier témoignage',
      },
      {
        prenom: 'Paul',
        details: 'Un second témoignage',
      },
      {
        prenom: 'Pierre',
        details: 'Un troisième et dernier démoignage',
      },
    ],
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
      await request(serveur)
        .post('/api/jeux')
        .send({
          ...corpsNouveauJeuValide,
          temoignages: [{ prenom: 'Michel', details: "C'était trop bien" }],
        });

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux[0].id).toBeDefined();
      expect(mesJeux[0].nom).toEqual('Cluedo');
      expect(mesJeux[0].sequence).toEqual('heure');
      expect(mesJeux[0].nomEtablissement).toEqual('Lycée de la mer');
      expect(mesJeux[0].classe).toEqual('cp');
      expect(mesJeux[0].discipline).toEqual('mathematiques');
      expect(mesJeux[0].eleves).toStrictEqual(['Gontran']);
      expect(mesJeux[0].categorie).toEqual('simulation');
      expect(mesJeux[0].thematiques).toEqual(['menace-cyber', 'orientation']);
      expect(mesJeux[0].description).toEqual('Un texte descriptif du jeu');
      expect(mesJeux[0].temoignages).toStrictEqual([
        { prenom: 'Michel', details: "C'était trop bien" },
      ]);
    });

    it('publie un événement de création de jeu', async () => {
      await request(serveur).post('/api/jeux').send(corpsNouveauJeuValide);

      busEvenements.aRecuUnEvenement(JeuCree);
      const evenement = busEvenements.recupereEvenement(JeuCree)!;
      expect(evenement.emailAuteur).toBe('jeanne.dupont@mail.com');
      expect(evenement.nom).toBe('Cluedo');
      expect(evenement.sequence).toBe('heure');
      expect(evenement.nomEtablissement).toBe('Lycée de la mer');
      expect(evenement.classe).toBe('cp');
      expect(evenement.discipline).toBe('mathematiques');
      expect(evenement.nombreEleves).toBe(1);
      expect(evenement.categorie).toBe('simulation');
      expect(evenement.thematiques).toEqual(['menace-cyber', 'orientation']);
      expect(evenement.nombreTemoignages).toBe(3);
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

    describe('concernant la vérification du nom de l‘établissement', () => {
      it('vérifie que le nom de l‘établissement est fourni', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            nomEtablissement: undefined,
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Le nom de l‘établissement est obligatoire',
        );
      });

      it("vérifie que le nom n'est pas vide", async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({ ...corpsNouveauJeuValide, nomEtablissement: '   ' });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Le nom de l‘établissement est obligatoire',
        );
      });
    });

    describe('concernant la vérification de la discipline', () => {
      it('vérifie que la discipline est fournie', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            discipline: undefined,
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La discipline est invalide');
      });

      it('vérifie que la discipline fait partie des valeurs attendues', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            discipline: 'mauvaise-discipline',
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La discipline est invalide');
      });
    });

    describe('concernant la vérification de la classe', () => {
      it('vérifie que la classe est fournie', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            classe: undefined,
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La classe est invalide');
      });

      it('vérifie que la classe fait partie des valeurs attendues', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            classe: 'mauvaise-classe',
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La classe est invalide');
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

    describe('concernant la vérification de la liste des élèves', () => {
      it('vérifie qu‘au moins un élève est renseigné', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            eleves: [],
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Au moins un élève est requis');
      });

      it('vérifie que les prénoms fournis ne soient pas vides', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            eleves: ['Gontran', ''],
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Les prénoms fournis sont invalides',
        );
      });
    });

    describe('concernant la vérification de la catégorie', () => {
      it('vérifie que la catégorie est fournie', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            categorie: undefined,
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La catégorie est invalide');
      });

      it('vérifie que la catégorie fait partie des valeurs attendues', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            categorie: 'mauvaise-categorie',
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La catégorie est invalide');
      });
    });

    describe('concernant la vérification des thématiques', () => {
      it("vérifie qu'au moins une thématique est fournie", async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            thematiques: [],
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La thématique est invalide');
      });

      it('vérifie que toutes les thématiques font partie des valeurs attendues', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            thematiques: ['orientation', 'mauvaise-thematique'],
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La thématique est invalide');
      });
    });

    describe('concernant la vérification de la description', () => {
      it('vérifie que la description est fournie', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            description: undefined,
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'La description du jeu est obligatoire',
        );
      });

      it("vérifie que le nom n'est pas vide", async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({ ...corpsNouveauJeuValide, description: '   ' });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'La description du jeu est obligatoire',
        );
      });

      it('vérifie que la description ne dépasse pas 8000 caractères', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({ ...corpsNouveauJeuValide, description: 'mots'.repeat(2001) });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'La description ne peut contenir que 8000 caractères maximum',
        );
      });
    });

    describe('concernant la vérification des témoignages', () => {
      it('accepte les témoignages non définis', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            temoignages: undefined,
          });

        expect(reponse.status).toEqual(201);
      });

      it('accepte les témoignages vides', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            temoignages: [],
          });

        expect(reponse.status).toEqual(201);
      });

      it("vérifie que le prénom existe dans un témoignage'", async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            temoignages: [
              { nom: 'ça devrait être le prénom', details: 'un détail' },
            ],
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Le prénom est obligatoire dans un témoignage',
        );
      });

      it("vérifie que les détails existent dans un témoignage'", async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            temoignages: [{ prenom: 'Miche' }],
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Les détails sont obligatoires dans un témoignage',
        );
      });

      it('vérifie que la description ne dépasse pas 8000 caractères', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux')
          .send({
            ...corpsNouveauJeuValide,
            temoignages: [{ prenom: 'Jean', details: 'mots'.repeat(2001) }],
          });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Les détails d‘un témoignage ne peuvent excéder 8000 caractères',
        );
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
          classe: 'cp',
          discipline: 'histoire-et-geographie',
          nomEtablissement: 'Lycée de la mer',
          eleves: [],
          categorie: 'simulation',
          thematiques: ['menace-cyber', 'orientation'],
          description: 'Une description',
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
          classe: 'cp',
          discipline: 'histoire-et-geographie',
          nomEtablissement: 'Lycée de la mer',
          eleves: [],
          categorie: 'simulation',
          thematiques: ['menace-cyber', 'orientation'],
          description: 'Une description',
        }),
      );
      await entrepotJeux.ajoute(
        new Jeu({
          id: '2',
          nom: 'cyberuno',
          enseignant: jeanneDupont,
          sequence: 'heure',
          classe: 'cp',
          discipline: 'histoire-et-geographie',
          nomEtablissement: 'Lycée de la mer',
          eleves: [],
          categorie: 'simulation',
          thematiques: ['menace-cyber', 'orientation'],
          description: 'Une description',
        }),
      );

      const reponse = await request(serveur).get('/api/jeux');

      expect(reponse.body).toStrictEqual([{ id: '2', nom: 'cyberuno' }]);
    });
  });
});
