import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';
import { creeServeur } from '../../src/api/dsc';
import { AdaptateurRechercheEntreprise } from '../../src/infra/adaptateurRechercheEntreprise';
import { EntrepotUtilisateurMemoire } from '../infra/entrepotUtilisateurMemoire';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource utilisateur', () => {
  let serveur: Express;
  let entrepotUtilisateur: EntrepotUtilisateurMemoire;
  let adaptateurRechercheEntreprise: AdaptateurRechercheEntreprise;
  let adaptateurJWT: AdaptateurJWT;
  const donneesUtilisateur = {
    telephone: '0123456789',
    domainesSpecialite: ['RSSI'],
    siretEntite: '13000766900018',
    infolettreAcceptee: true,
    token:
      JSON.stringify({
        email: 'jeanne.dupont@user.com',
        prenom: 'Jeanne',
        nom: 'Dupont',
        siret: '13000766900018',
      }) + '-code',
  };

  beforeEach(() => {
    entrepotUtilisateur = new EntrepotUtilisateurMemoire();
    adaptateurRechercheEntreprise = {
      rechercheOrganisationParSiret: async (_: string) => undefined,
    };
    adaptateurJWT = {
      decode: (token) => JSON.parse(token.slice(0, -5)),
      genereToken: () => '',
    };

    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      entrepotUtilisateur,
      adaptateurRechercheEntreprise,
      adaptateurJWT,
    });
  });

  describe('sur demande POST', () => {
    it('répond 201', async () => {
      const reponse = await request(serveur)
        .post('/api/utilisateurs')
        .send(donneesUtilisateur);

      expect(reponse.status).toBe(201);
    });

    it("ajoute un utilisateur à l'entrepot", async () => {
      adaptateurRechercheEntreprise.rechercheOrganisationParSiret =
        async () => ({
          nom: '',
          departement: '',
          siret: '13000766900018',
          codeTrancheEffectif: '01',
          codeRegion: 'FR-ARA',
          codeSecteur: 'D',
          estAssociation: false,
          estCollectivite: false,
        });

      await request(serveur).post('/api/utilisateurs').send(donneesUtilisateur);

      const jeanne = await entrepotUtilisateur.parEmailHache(
        'jeanne.dupont@user.com-hache'
      );
      expect(jeanne).toBeDefined();
      expect(jeanne?.email).toBe('jeanne.dupont@user.com');
      expect(jeanne?.prenom).toBe('Jeanne');
      expect(jeanne?.nom).toBe('Dupont');
      expect(jeanne?.siretEntite).toBe('13000766900018');
      expect(jeanne?.infolettreAcceptee).toBe(true);
    });
  });

  describe('concernant la validation des données', () => {
    it("valide l'acceptation de l'infolettre", async () => {
      const reponse = await request(serveur)
        .post('/api/utilisateurs')
        .send({
          ...donneesUtilisateur,
          infolettreAcceptee: 12,
        });
      expect(reponse.status).toBe( 400);
      expect(reponse.body.erreur).toBe("L'acceptation de l'infolettre est invalide"
      );
    });

    describe('valide le token', () => {
      it("lorsqu'il est vide", async () => {
        const reponse = await request(serveur)
          .post('/api/utilisateurs')
          .send({
            ...donneesUtilisateur,
            token: '',
          });
        expect(reponse.status).toBe( 400);
        expect(reponse.body.erreur).toBe('Le token est invalide');
      });

      it("lorsqu'il est mal signé", async () => {
        adaptateurJWT.decode = () => {
          throw new Error('Le token est invalide');
        };
        const reponse = await request(serveur)
          .post('/api/utilisateurs')
          .send({
            ...donneesUtilisateur,
            token: 'azertyui',
          });
        expect(reponse.status).toBe(400);
        expect(reponse.body.erreur).toBe('Le token est invalide');
      });
    });
  });
});
