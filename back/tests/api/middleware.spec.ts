import { Response } from 'express';
import { createRequest, createResponse, MockResponse } from 'node-mocks-http';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  fabriqueMiddleware,
  Middleware,
  RequeteNonTypee,
} from '../../src/api/middleware';
import { AdaptateurEnvironnement } from '../../src/infra/adaptateurEnvironnement';
import { Utilisateur } from '../../src/metier/utilisateur';
import {
  configurationDeTestDuServeur,
  fauxAdaptateurEnvironnement,
  fauxAdaptateurJWT,
} from './fauxObjets';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';

describe('Le middleware', () => {
  let requete: RequeteNonTypee & {
    emailUtilisateurCourant?: string;
    utilisateur?: Utilisateur | undefined;
  };
  let reponse: MockResponse<Response>;
  let middleware: Middleware;
  let adaptateurEnvironnement: AdaptateurEnvironnement;
  let adaptateurJWT: AdaptateurJWT;
  let vueRendue: string;

  beforeEach(() => {
    requete = createRequest();
    reponse = createResponse();
    reponse.render = (vue: string) => (vueRendue = vue);
    adaptateurEnvironnement = { ...fauxAdaptateurEnvironnement };
    adaptateurJWT = { ...fauxAdaptateurJWT };
    middleware = fabriqueMiddleware({
      ...configurationDeTestDuServeur(),
      adaptateurJWT,
      adaptateurEnvironnement,
    });
  });

  describe('sur vérification du mode maintenance', () => {
    it('affiche la page de maintenance lorsque le mode est actif', async () => {
      adaptateurEnvironnement.maintenance = () => ({
        actif: () => true,
        detailsPreparation: () => undefined,
      });

      await middleware.verifieModeMaintenance(requete, reponse, () => {});

      expect(reponse.statusCode).toBe(503);
      expect(vueRendue).toBe('maintenance');
    });

    it('appelle la suite lorsque le mode est inactif', async () => {
      adaptateurEnvironnement.maintenance = () => ({
        actif: () => false,
        detailsPreparation: () => undefined,
      });
      let suiteAppelee = false;

      await middleware.verifieModeMaintenance(requete, reponse, () => {
        suiteAppelee = true;
      });

      expect(suiteAppelee).toBeTruthy();
    });
  });

  describe('sur demande de validation du token JWT en cas de navigation', () => {
    it("redirige vers la page de connexion si le token n'est pas présent", async () => {
      let urlRecu;
      // @ts-expect-error (on sait que redirect va être appelé avec une URL et pas un code HTTP dans ce cas)
      reponse.redirect = (url: string) => {
        urlRecu = url;
        return;
      };

      await middleware.verifieJWTNavigation(requete, reponse, () => {});

      expect(urlRecu).toEqual('/connexion');
    });

    it('redirige vers la page de connexion si le token ne peut pas être décodé', async () => {
      adaptateurJWT.decode = () => {
        throw new Error('Erreur de token');
      };
      requete.session = {
        token: 'unToken',
      };

      let urlRecu;
      // @ts-expect-error (on sait que redirect va être appelé avec une URL et pas un code HTTP dans ce cas)
      reponse.redirect = (url: string) => {
        urlRecu = url;
        return;
      };

      await middleware.verifieJWTNavigation(requete, reponse, () => {});

      expect(urlRecu).toEqual('/connexion');
    });
  });
});
