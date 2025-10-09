import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
  fauxAdaptateurTeleversement,
} from './fauxObjets';
import { jeanneDupont } from './objetsPretsALEmploi';
import { PhotosJeu } from '../../src/metier/jeu';
import { Utilisateur } from '../../src/metier/utilisateur';
import {
  CorpsRequeteDeJeu,
  uneRequeteDeJeuValide,
} from './constructeurRequeteDeJeu';
import { MIMEType } from 'node:util';
import { unJeu } from '../metier/constructeurJeu';
import { CINQ_MO } from '../../src/api/ressourceMesJeux';
import { AdaptateurTeleversement } from '../../src/infra/adaptateurTeleversement';

describe('La ressource de mes jeux', () => {
  let serveur: Express;

  let entrepotJeux: EntrepotJeux;
  let busEvenements: MockBusEvenement;
  let middleware: Middleware;
  let adaptateurTeleversement: AdaptateurTeleversement;

  const ajouteUtilisateurARequeteMock = vi
    .fn()
    .mockImplementation((req, _res, suite) => {
      req.utilisateur = jeanneDupont;
      suite();
    });

  beforeEach(() => {
    entrepotJeux = new EntrepotJeuxMemoire();
    busEvenements = fabriqueBusPourLesTests();
    middleware = fabriqueMiddleware(configurationServeurSansMiddleware());
    middleware.ajouteUtilisateurARequete = () => ajouteUtilisateurARequeteMock;
    adaptateurTeleversement = fauxAdaptateurTeleversement();
    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      middleware,
      busEvenements,
      entrepotJeux,
      adaptateurTeleversement,
    });
  });

  describe('sur un POST', () => {
    const executeLaRequete = (
      serveur: Express,
      corpsRequeteDeJeu: CorpsRequeteDeJeu | unknown,
    ) =>
      request(serveur)
        .post('/api/mes-jeux')
        .field('jeu', JSON.stringify(corpsRequeteDeJeu))
        .attach('couverture', Buffer.from('une-image'), 'test.jpg');

    it("retourne un 201 si l'utilisateur est connecté", async () => {
      const reponse = await executeLaRequete(
        serveur,
        uneRequeteDeJeuValide().construis(),
      );

      expect(reponse.status).toEqual(201);
    });

    it("retourne un 401 si il n'y a pas d'utilisateur connecté", async () => {
      ajouteUtilisateurARequeteMock.mockImplementationOnce(
        (_req, res, _suite) => {
          res.sendStatus(401);
        },
      );
      const reponse = await request(serveur)
        .post('/api/mes-jeux')
        .send(uneRequeteDeJeuValide().construis());

      expect(reponse.status).toEqual(401);
    });

    it("ajoute un jeu dans l'entrepot des jeux", async () => {
      await executeLaRequete(serveur, uneRequeteDeJeuValide().construis());

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux).toHaveLength(1);
    });

    it('peut fournir les informations sur le jeu', async () => {
      adaptateurTeleversement.photosJeu = () => ({
        couverture: {
          nom: 'image-1',
          mimeType: new MIMEType('image/jpeg'),
          image: Buffer.from('une-image'),
          chemin: '/le-chemin/image.jpeg',
        },
        photos: [],
      });
      const reponse = await executeLaRequete(
        serveur,
        uneRequeteDeJeuValide()
          .avecTemoignages([{ prenom: 'Michel', details: "C'était trop bien" }])
          .avecConsentement(true)
          .construis(),
      );

      expect(reponse.status).toBe(201);
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
      expect(mesJeux[0].photos).toStrictEqual<PhotosJeu>({
        couverture: { chemin: '/le-chemin/image.jpeg' },
        photos: [],
      });
      expect(mesJeux[0].consentement).toBeTruthy();
    });

    it('sauvegarde les photos du jeu', async () => {
      let couvertureSauvegardee = false;
      adaptateurTeleversement.photosJeu = () => ({
        couverture: {
          nom: 'image-1',
          mimeType: new MIMEType('image/jpeg'),
          image: Buffer.from('une-image'),
          chemin: '/le-chemin/image.jpeg',
        },
        photos: [],
      });
      adaptateurTeleversement.sauvegarde = async () => {
        couvertureSauvegardee = true;
      };

      const reponse = await executeLaRequete(
        serveur,
        uneRequeteDeJeuValide()
          .avecTemoignages([{ prenom: 'Michel', details: "C'était trop bien" }])
          .construis(),
      );

      expect(reponse.status).toBe(201);
      expect(couvertureSauvegardee).toBeTruthy();
    });

    it('ajoute les  photos complémetaires téléversées', async () => {
      adaptateurTeleversement.photosJeu = () => ({
        couverture: {
          nom: 'test',
          mimeType: new MIMEType('image/jpeg'),
          image: Buffer.from('une-image'),
          chemin: 'chemin-couverture',
        },
        photos: [
          {
            nom: 'une-image',
            mimeType: new MIMEType('image/jpeg'),
            image: Buffer.from('une-image'),
            chemin: 'chemin-1',
          },
          {
            nom: 'une-image',
            mimeType: new MIMEType('image/jpeg'),
            image: Buffer.from('une-image'),
            chemin: 'chemin-2',
          },
        ],
      });

      await request(serveur)
        .post('/api/mes-jeux')
        .field('jeu', JSON.stringify(uneRequeteDeJeuValide().construis()))
        .attach('couverture', Buffer.from('une-image'), 'test.jpg')
        .attach('photos', Buffer.from('une-image'), 'test-1.jpg')
        .attach('photos', Buffer.from('une-image'), 'test-2.jpg');

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux[0].photos).toStrictEqual<PhotosJeu>({
        couverture: {
          chemin: 'chemin-couverture',
        },
        photos: [
          {
            chemin: 'chemin-1',
          },
          {
            chemin: 'chemin-2',
          },
        ],
      });
    });

    it('publie un événement de création de jeu', async () => {
      await executeLaRequete(
        serveur,
        uneRequeteDeJeuValide().avecConsentement(true).construis(),
      );

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
      expect(evenement.consentement).toBeTruthy();
    });

    it('publie un événement de création de jeu avec l’évaluation du jeu', async () => {
      await executeLaRequete(
        serveur,
        uneRequeteDeJeuValide()
          .avecEvaluations({
            evaluationDecouverte: 2,
            evaluationInteret: 3,
            evaluationSatisfactionGenerale: 1,
            precisions: 'Des précisions',
          })
          .construis(),
      );

      busEvenements.aRecuUnEvenement(JeuCree);
      const evenement = busEvenements.recupereEvenement(JeuCree)!;
      expect(evenement.evaluationDecouverte).toBe(2);
      expect(evenement.evaluationInteret).toBe(3);
      expect(evenement.evaluationSatisfactionGenerale).toBe(1);
      expect(evenement.precisions).toBe('Des précisions');
    });

    it("associe le jeu à l'utilisateur connecté", async () => {
      await executeLaRequete(serveur, uneRequeteDeJeuValide().construis());

      const mesJeux = await entrepotJeux.tous();
      expect(mesJeux[0].enseignant?.email).toEqual('jeanne.dupont@mail.com');
    });

    describe('concernant la vérification du nom', () => {
      it('vérifie que le nom est fourni', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          nom: undefined,
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Le nom est obligatoire');
      });

      it("vérifie que le nom n'est pas vide", async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide().avecUnNom('     ').construis(),
        );

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Le nom est obligatoire');
      });
    });

    describe('concernant la vérification du nom de l‘établissement', () => {
      it('vérifie que le nom de l‘établissement est fourni', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          nomEtablissement: undefined,
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Le nom de l‘établissement est obligatoire',
        );
      });

      it("vérifie que le nom n'est pas vide", async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide().avecUnNomEtablissement('    ').construis(),
        );

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Le nom de l‘établissement est obligatoire',
        );
      });
    });

    describe('concernant la vérification de la discipline', () => {
      it('vérifie que la discipline est fournie', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          discipline: undefined,
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La discipline est invalide');
      });

      it('vérifie que la discipline fait partie des valeurs attendues', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          discipline: 'mauvaise-discipline',
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La discipline est invalide');
      });
    });

    describe('concernant la vérification de la classe', () => {
      it('vérifie que la classe est fournie', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          classe: undefined,
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La classe est invalide');
      });

      it('vérifie que la classe fait partie des valeurs attendues', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          classe: 'mauvaise-classe',
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La classe est invalide');
      });
    });

    describe('concernant la vérification de la séquence', () => {
      it('vérifie que la séquence est fournie', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          sequence: undefined,
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La séquence est invalide');
      });

      it("vérifie que la séquence n'est pas vide", async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          sequence: '      ',
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La séquence est invalide');
      });

      it('vérifie que la séquence fait partie des valeurs attendues', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          sequence: 'mauvaise-sequence',
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La séquence est invalide');
      });
    });

    describe('concernant la vérification de la liste des élèves', () => {
      it('vérifie qu‘au moins un élève est renseigné', async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide().sansEleves().construis(),
        );

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Au moins un élève est requis');
      });

      it('vérifie que les prénoms fournis ne soient pas vides', async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide().ajouteUnEleve('').construis(),
        );

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Les prénoms fournis sont invalides',
        );
      });
    });

    describe('concernant la vérification de la catégorie', () => {
      it('vérifie que la catégorie est fournie', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          categorie: undefined,
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La catégorie est invalide');
      });

      it('vérifie que la catégorie fait partie des valeurs attendues', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          categorie: 'mauvaise-categorie',
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La catégorie est invalide');
      });
    });

    describe('concernant la vérification des thématiques', () => {
      it("vérifie qu'au moins une thématique est fournie", async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide().sansThematiques().construis(),
        );

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La thématique est invalide');
      });

      it('vérifie que toutes les thématiques font partie des valeurs attendues', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          thematiques: ['orientation', 'mauvaise-thematique'],
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('La thématique est invalide');
      });
    });

    describe('concernant la vérification de la description', () => {
      it('vérifie que la description est fournie', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          description: undefined,
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'La description du jeu est obligatoire',
        );
      });

      it("vérifie que le nom n'est pas vide", async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide().avecUneDescription('   ').construis(),
        );

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'La description du jeu est obligatoire',
        );
      });

      it('vérifie que la description ne dépasse pas 8000 caractères', async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide()
            .avecUneDescription('mots'.repeat(2001))
            .construis(),
        );

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'La description ne peut contenir que 8000 caractères maximum',
        );
      });
    });

    describe('concernant la vérification des témoignages', () => {
      it('accepte les témoignages non définis', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          temoignages: undefined,
        });

        expect(reponse.status).toEqual(201);
      });

      it('accepte les témoignages vides', async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide().sansTemoignages().construis(),
        );

        expect(reponse.status).toEqual(201);
      });

      it("vérifie que le prénom existe dans un témoignage'", async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
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
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          temoignages: [{ prenom: 'Miche' }],
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Les détails sont obligatoires dans un témoignage',
        );
      });

      it('vérifie que les détails ne dépassent pas 8000 caractères', async () => {
        const reponse = await executeLaRequete(
          serveur,
          uneRequeteDeJeuValide()
            .avecTemoignages([{ prenom: 'Jean', details: 'mots'.repeat(2001) }])
            .construis(),
        );

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(
          'Les détails d‘un témoignage ne peuvent excéder 8000 caractères',
        );
      });
    });

    describe('concernant la vérification de l’évaluation sur CyberEnjeux', () => {
      it('accepte les précisions sur l‘évaluation CyberEnjeux non définies', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          precisions: undefined,
        });

        expect(reponse.status).toEqual(201);
      });

      it.each([
        {
          test: 'la note sur l‘évaluation découverte est inférieure ou égal à 5',
          evaluation: { evaluationDecouverte: 6 },
          erreurAttendue:
            'La note d‘évaluation pour la découverte doit être comprise entre 1 et 5',
        },
        {
          test: 'la note sur l‘évaluation découverte est supérieure ou égal à 1',
          evaluation: { evaluationDecouverte: 0 },
          erreurAttendue:
            'La note d‘évaluation pour la découverte doit être comprise entre 1 et 5',
        },
        {
          test: 'la note sur l‘évaluation intérêt est inférieure ou égal à 5',
          evaluation: { evaluationInteret: 6 },
          erreurAttendue:
            'La note d‘évaluation pour l‘intérêt doit être comprise entre 1 et 5',
        },
        {
          test: 'la note sur l‘évaluation intérêt est supérieure ou égal à 1',
          evaluation: { evaluationInteret: 0 },
          erreurAttendue:
            'La note d‘évaluation pour l‘intérêt doit être comprise entre 1 et 5',
        },
        {
          test: 'la note sur l‘évaluation satisfaction générale est inférieur ou égal à 5',
          evaluation: { evaluationSatisfactionGenerale: 6 },
          erreurAttendue:
            'La note d‘évaluation pour la satisfaction générale doit être comprise entre 1 et 5',
        },
        {
          test: 'la note sur l‘évaluation satisfaction générale est supérieur ou égal à 1',
          evaluation: { evaluationSatisfactionGenerale: 0 },
          erreurAttendue:
            'La note d‘évaluation pour la satisfaction générale doit être comprise entre 1 et 5',
        },
        {
          test: 'les précisions ne sont pas vides',
          evaluation: { precisions: '    ' },
          erreurAttendue: 'Les précisions ne peuvent pas être vides',
        },
      ])('vérifie que $test', async (parametresDeTest) => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          ...parametresDeTest.evaluation,
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual(parametresDeTest.erreurAttendue);
      });
    });

    describe('concernant la vérification du téléversement de photos d’un jeu', () => {
      it('limite le nombre de couverture à 1', async () => {
        const reponse = await request(serveur)
          .post('/api/mes-jeux')
          .field('jeu', JSON.stringify(uneRequeteDeJeuValide().construis()))
          .attach('couverture', Buffer.from('une-image'), 'test.jpg')
          .attach('couverture', Buffer.from('une-image'), 'test-2.jpg');

        expect(reponse.status).toEqual(400);
        expect(reponse.body).toEqual({
          erreur: 'Une seule photo de couverture est autorisée',
        });
      });

      it('limite le nombre à 5 photos au total', async () => {
        const reponse = await request(serveur)
          .post('/api/mes-jeux')
          .field('jeu', JSON.stringify(uneRequeteDeJeuValide().construis()))
          .attach('couverture', Buffer.from('une-image'), 'test.jpg')
          .attach('photos', Buffer.from('une-image'), 'test-2.jpg')
          .attach('photos', Buffer.from('une-image'), 'test-3.jpg')
          .attach('photos', Buffer.from('une-image'), 'test-4.jpg')
          .attach('photos', Buffer.from('une-image'), 'test-5.jpg')
          .attach('photos', Buffer.from('une-image'), 'test-6.jpg');

        expect(reponse.status).toEqual(400);
        expect(reponse.body).toEqual({
          erreur: 'Le nombre de photos maximum par jeu est de 5',
        });
      });

      it('limite la taille maximale à 5MO pour les photos', async () => {
        const reponse = await request(serveur)
          .post('/api/mes-jeux')
          .field('jeu', JSON.stringify(uneRequeteDeJeuValide().construis()))
          .attach('photos', Buffer.alloc(CINQ_MO + 1, 0), 'test.jpg');

        expect(reponse.status).toEqual(400);
        expect(reponse.body).toEqual({
          erreur: 'Le poids maximum d’une photo est de 5MO',
        });
      });

      it('limite la taille maximale à 5MO pour la couverture', async () => {
        const reponse = await request(serveur)
          .post('/api/mes-jeux')
          .field('jeu', JSON.stringify(uneRequeteDeJeuValide().construis()))
          .attach('couverture', Buffer.alloc(CINQ_MO + 1, 0), 'test.jpg');

        expect(reponse.status).toEqual(400);
        expect(reponse.body).toEqual({
          erreur: 'Le poids maximum de la couverture est de 5MO',
        });
      });
    });

    describe('concernant la vérification du consentemment', () => {
      it('vérifie que le consentemment est valide', async () => {
        const reponse = await executeLaRequete(serveur, {
          ...uneRequeteDeJeuValide().construis(),
          consentement: 'mauvais-type',
        });

        expect(reponse.status).toEqual(400);
        expect(reponse.body.erreur).toEqual('Le consentement est invalide');
      });
    });
  });

  describe('sur un GET', () => {
    it('retourne un 200 si l’utilisateur est connecté', async () => {
      const reponse = await request(serveur).get('/api/mes-jeux');

      expect(reponse.status).toEqual(200);
    });

    it("retourne un 401 si il n'y a pas d'utilisateur connecté", async () => {
      ajouteUtilisateurARequeteMock.mockImplementationOnce(
        (_req, res, _suite) => {
          res.sendStatus(401);
        },
      );
      const reponse = await request(serveur).get('/api/mes-jeux');

      expect(reponse.status).toEqual(401);
    });

    it('retourne la liste des jeux', async () => {
      await entrepotJeux.ajoute(
        unJeu()
          .avecUnId('1')
          .avecUnNom('cybercluedo')
          .deEnseignant(jeanneDupont)
          .avecUneCouverture('une-couverture')
          .avecUnePhoto('photo-1')
          .avecUnePhoto('photo-2')
          .construis(),
      );

      const reponse = await request(serveur).get('/api/mes-jeux');

      expect(reponse.body).toStrictEqual([
        {
          id: '1',
          nom: 'cybercluedo',
          thematiques: [],
          eleves: [],
          photos: {
            couverture: { chemin: 'une-couverture' },
            photos: [{ chemin: 'photo-1' }, { chemin: 'photo-2' }],
          },
        },
      ]);
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
        unJeu().avecUnId('1').deEnseignant(patrickDurand).construis(),
      );
      await entrepotJeux.ajoute(
        unJeu()
          .avecUnId('2')
          .avecUnNom('cyberuno')
          .deEnseignant(jeanneDupont)
          .avecLesThematiques(['menace-cyber', 'orientation'])
          .dansEtablissement('Lycée de la mer')
          .avecEleves(['Kevin', 'Branda'])
          .avecUneCouverture('une-couverture')
          .avecUnePhoto('photo-1')
          .avecUnePhoto('photo-2')
          .construis(),
      );

      const reponse = await request(serveur).get('/api/mes-jeux');

      expect(reponse.body).toStrictEqual([
        {
          id: '2',
          nom: 'cyberuno',
          thematiques: ['menace-cyber', 'orientation'],
          nomEtablissement: 'Lycée de la mer',
          eleves: ['Kevin', 'Branda'],
          photos: {
            couverture: { chemin: 'une-couverture' },
            photos: [{ chemin: 'photo-1' }, { chemin: 'photo-2' }],
          },
        },
      ]);
    });
  });
});
