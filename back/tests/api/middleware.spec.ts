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
} from './fauxObjets';

describe('Le middleware', () => {
  let requete: RequeteNonTypee & {
    emailUtilisateurCourant?: string;
    utilisateur?: Utilisateur | undefined;
  };
  let reponse: MockResponse<Response>;
  let middleware: Middleware;
  let adaptateurEnvironnement: AdaptateurEnvironnement;
  let vueRendue: string;

  beforeEach(() => {
    requete = createRequest();
    reponse = createResponse();
    reponse.render = (vue: string) => (vueRendue = vue);
    adaptateurEnvironnement = { ...fauxAdaptateurEnvironnement };
    middleware = fabriqueMiddleware({
      ...configurationDeTestDuServeur(),
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
});
