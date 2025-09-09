import { Express } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { EntrepotUtilisateur } from '../../src/metier/entrepotUtilisateur';
import { Utilisateur } from '../../src/metier/utilisateur';
import { EntrepotUtilisateurMemoire } from '../infra/entrepotUtilisateurMemoire';
import { encodeSession, enObjet } from './cookie';
import { configurationDeTestDuServeur, fauxAdaptateurJWT } from './fauxObjets';

describe('La ressource Profil', () => {
  let serveur: Express;
  let entrepotUtilisateur: EntrepotUtilisateur;

  const jeanneDupont = new Utilisateur({
    email: 'jeanne.dupont@mail.com',
    infolettreAcceptee: true,
    prenom: '',
    nom: '',
    siretEntite: '',
  });

  beforeEach(() => {
    entrepotUtilisateur = new EntrepotUtilisateurMemoire();
    entrepotUtilisateur.ajoute(jeanneDupont);
    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      entrepotUtilisateur,
    });
  });

  describe('sur demande GET', () => {
    it('répond 200 quand un utilisateur est connecté', async () => {
      const cookie = encodeSession({
        email: 'jeanne.dupont@mail.com',
      });

      const reponse = await request(serveur)
        .get('/api/profil')
        .set('Cookie', [cookie]);

      expect(reponse.status).toEqual(200);
    });

    it("renvoie les informations de l'utilisateur", async () => {
      const cookie = encodeSession({
        email: 'jeanne.dupont@mail.com',
      });

      const reponse = await request(serveur)
        .get('/api/profil')
        .set('Cookie', [cookie]);

      expect(reponse.body.email).toEqual('jeanne.dupont@mail.com');
    });

    it("répond 204 lorsqu'aucun utilisateur est connecté", async () => {
      const reponse = await request(serveur).get('/api/profil');

      expect(reponse.status).toEqual(204);
    });

    it('supprime la session si le token JWT est invalide', async () => {
      const cookieSession = encodeSession({ token: 'token-session' });

      serveur = creeServeur({
        ...configurationDeTestDuServeur(),
        adaptateurJWT: {
          ...fauxAdaptateurJWT,
          decode(_: string) {
            throw new JsonWebTokenError('mauvais token');
          },
        },
      });
      const reponse = await request(serveur)
        .get('/api/profil')
        .set('Cookie', [cookieSession]);

      const headerCookie = reponse.headers['set-cookie'];
      expect(headerCookie).toBeDefined();
      const cookieSessionDecode = enObjet(headerCookie[0]);
      expect(cookieSessionDecode.session).toEqual('');
    });
  });
});
