import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { AdaptateurJWT } from '../../../src/api/adaptateurJWT';
import { ConfigurationServeur } from '../../../src/api/configurationServeur';
import { creeServeur } from '../../../src/api/dsc';
import { AdaptateurOIDC } from '../../../src/api/oidc/adaptateurOIDC';
import { Utilisateur } from '../../../src/metier/utilisateur';
import { EntrepotUtilisateurMemoire } from '../../infra/entrepotUtilisateurMemoire';
import { decodeSessionDuCookie } from '../cookie';
import {
  configurationDeTestDuServeur,
  fauxAdaptateurJWT,
  fauxAdaptateurOIDC,
} from '../fauxObjets';

describe('La ressource apres authentification OIDC', () => {
  describe('quand on fait un GET sur /oidc/apres-authentification', () => {
    let serveur: Express;
    let adaptateurOIDC: AdaptateurOIDC;
    let adaptateurJWT: AdaptateurJWT;
    let entrepotUtilisateur: EntrepotUtilisateurMemoire;

    beforeEach(() => {
      adaptateurOIDC = { ...fauxAdaptateurOIDC };
      adaptateurJWT = { ...fauxAdaptateurJWT };
      entrepotUtilisateur = new EntrepotUtilisateurMemoire();
      const configurationServeur: ConfigurationServeur = {
        ...configurationDeTestDuServeur(),
        adaptateurOIDC,
        adaptateurJWT,
        entrepotUtilisateur,
      };
      serveur = creeServeur(configurationServeur);
    });

    const requeteGet = () =>
      request(serveur)
        .get('/oidc/apres-authentification')
        .set('Cookie', ['AgentConnectInfo={}']);

    describe("si l'utilisateur est connu", () => {
      beforeEach(async () => {
        const jeanneDupont = new Utilisateur({
          email: 'jeanne.dupont@mail.com',
          infolettreAcceptee: true,
          prenom: '',
          nom: '',
          siretEntite: '',
        });
        await entrepotUtilisateur.ajoute(jeanneDupont);

        adaptateurOIDC.recupereInformationsUtilisateur = async (_) => ({
          prenom: 'Jeanne',
          nom: 'Dupont',
          email: 'jeanne.dupont@mail.com',
          siret: '1234',
        });
      });

      it('reçoit 200', async () => {
        const reponse = await requeteGet();

        expect(reponse.status).toBe(200);
      });

      it("ajoute les informations de l'utilisateur à la session", async () => {
        adaptateurOIDC.recupereJeton = async () => {
          return { idToken: 'xx', accessToken: 'y' };
        };
        adaptateurOIDC.recupereInformationsUtilisateur = async (
          accessToken,
        ) => {
          if (accessToken === 'y') {
            return {
              prenom: 'Jeanne',
              nom: 'Dupont',
              email: 'jeanne.dupont@mail.com',
              siret: '1234',
            };
          }
          throw new Error('Aurait du être appelé avec le bon access token');
        };

        const reponse = await requeteGet();

        const session = decodeSessionDuCookie(reponse, 0);
        expect(session).toBeDefined();
        expect(session.prenom).toBe('Jeanne');
        expect(session.nom).toBe('Dupont');
        expect(session.email).toBe('jeanne.dupont@mail.com');
        expect(session.siret).toBe('1234');
      });

      it('ajoute un token JWT à la session', async () => {
        adaptateurJWT.genereToken = (donnees: Record<string, unknown>) =>
          `tokenJWT-${donnees.email}`;

        const reponse = await requeteGet();

        const session = decodeSessionDuCookie(reponse, 0);
        expect(session.token).toBe('tokenJWT-jeanne.dupont@mail.com');
      });

      it('ajoute un tokenId AgentConnect à la session', async () => {
        adaptateurOIDC.recupereJeton = async () => {
          return { idToken: 'tokenAgentConnect', accessToken: 'y' };
        };

        const reponse = await requeteGet();

        const session = decodeSessionDuCookie(reponse, 0);
        expect(session.AgentConnectIdToken).toBe('tokenAgentConnect');
      });

      it('sert la page apres-authentification', async () => {
        const reponse = await requeteGet();

        expect(reponse.headers['content-type']).toEqual(
          'text/html; charset=utf-8',
        );
        expect(reponse.text).toMatchSnapshot();
      });
    });

    it("jette une erreur 401 si le cookie AgentConnectInfo n'est pas défini", async () => {
      const reponse = await requeteGet().set('Cookie', []);

      expect(reponse.status).toBe(401);
    });

    it('jette une erreur 401 si quoi que ce soit se passe mal', async () => {
      adaptateurOIDC.recupereJeton = async () => {
        throw new Error('mauvais state');
      };

      const reponse = await requeteGet();

      expect(reponse.status).toBe(401);
    });

    it("redirige vers la page /non-autorise si l'email de l'utilisateur n'est pas autorisé", async () => {
      adaptateurOIDC.recupereInformationsUtilisateur = async () => ({
        prenom: 'Jeanne',
        nom: 'Dupont',
        email: 'jeanne.dupont@argriculture.gouv.fr',
        siret: '1234',
      });

      const reponse = await requeteGet();

      expect(reponse.status).toBe(302);
      expect(reponse.headers.location).toBe('/non-autorise');
    });

    describe("si l'utilisateur est inconnu mais autorisé", () => {
      it('ajoute un token contenant les informations du nouvel utilisateur et redirige vers la page de création de compte', async () => {
        adaptateurOIDC.recupereInformationsUtilisateur = async (_) => ({
          prenom: 'Jeanne',
          nom: 'Dupont',
          email: 'jeanne.dupont@mail.com',
          siret: '1234',
        });
        adaptateurJWT.genereToken = (donnees: Record<string, unknown>) =>
          `tokenJWT-${donnees.email}`;

        const reponse = await requeteGet();

        expect(reponse.status).toBe(302);
        expect(reponse.headers.location).toBe(
          '/creation-compte?token=tokenJWT-jeanne.dupont@mail.com',
        );
      });
    });
  });
});
