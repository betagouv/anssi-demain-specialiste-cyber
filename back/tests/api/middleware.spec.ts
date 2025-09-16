import { Response } from 'express';
import { createRequest, createResponse, MockResponse } from 'node-mocks-http';
import { beforeEach, describe, expect, it } from 'vitest';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';
import {
  fabriqueMiddleware,
  Middleware,
  RequeteNonTypee,
} from '../../src/api/middleware';
import { AdaptateurEnvironnement } from '../../src/infra/adaptateurEnvironnement';
import { AdaptateurHachage } from '../../src/infra/adaptateurHachage';
import { EntrepotUtilisateur } from '../../src/metier/entrepotUtilisateur';
import { Utilisateur } from '../../src/metier/utilisateur';
import { EntrepotUtilisateurMemoire } from '../infra/entrepotUtilisateurMemoire';
import {
  configurationDeTestDuServeur,
  fauxAdaptateurEnvironnement,
  fauxAdaptateurHachage,
  fauxAdaptateurJWT,
} from './fauxObjets';
import { jeanneDupont } from './objetsPretsALEmploi';

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

  describe("sur demande d'ajout de l'utilisateur courant", () => {
    let adaptateurHachage: AdaptateurHachage;
    let entrepotUtilisateur: EntrepotUtilisateur;

    beforeEach(() => {
      adaptateurHachage = fauxAdaptateurHachage;
      entrepotUtilisateur = new EntrepotUtilisateurMemoire();
    });

    it("ajoute l'utilisateur dont l'email est dans le token de la session liée à la requête", async () => {
      adaptateurJWT.decode = () => ({
        email: 'jeanne.dupont@mail.com',
      });
      await entrepotUtilisateur.ajoute(jeanneDupont);

      await middleware.ajouteUtilisateurARequete(
        entrepotUtilisateur,
        adaptateurHachage,
      )(requete, reponse, () => {});

      expect(requete.utilisateur).toStrictEqual(jeanneDupont);
    });

    it("n'assigne pas l'utilisateur si non défini dans la session", async () => {
      await entrepotUtilisateur.ajoute(jeanneDupont);

      await middleware.ajouteUtilisateurARequete(
        entrepotUtilisateur,
        adaptateurHachage,
      )(requete, reponse, () => {});

      expect(requete.utilisateur).toBeUndefined();
    });

    it('appelle la suite', async () => {
      let suiteAppelee = false;

      await middleware.ajouteUtilisateurARequete(
        entrepotUtilisateur,
        adaptateurHachage,
      )(requete, reponse, () => {
        suiteAppelee = true;
      });

      expect(suiteAppelee).toBeTruthy();
    });

    it("n'essaie pas de hacher si l'email est absent", async () => {
      adaptateurHachage.hache = (_) => {
        throw new Error();
      };
      let suiteAppelee = false;

      await middleware.ajouteUtilisateurARequete(
        entrepotUtilisateur,
        adaptateurHachage,
      )(requete, reponse, () => {
        suiteAppelee = true;
      });

      expect(suiteAppelee).toBeTruthy();
    });

    it("renvoie une erreur 500 lorsque l'entrepôt ne fonctionne pas", async () => {
      adaptateurJWT.decode = () => ({
        email: 'jeanne.dupont@mail.com',
      });
      entrepotUtilisateur.parEmailHache = (_emailHache: string) => {
        throw new Error();
      };
      let suiteAppelee = false;

      await middleware.ajouteUtilisateurARequete(
        entrepotUtilisateur,
        adaptateurHachage,
      )(requete, reponse, () => {
        suiteAppelee = true;
      });

      expect(reponse.statusCode).toEqual(500);
      expect(suiteAppelee).toBeFalsy();
    });

    it('renvoie une erreur 401 si le jeton est invalide', async () => {
      adaptateurJWT.decode = () => {
        throw new Error('Token invalide');
      };
      let suiteAppelee = false;

      await middleware.ajouteUtilisateurARequete(
        entrepotUtilisateur,
        adaptateurHachage,
      )(requete, reponse, () => {
        suiteAppelee = true;
      });

      expect(reponse.statusCode).toEqual(401);
      expect(suiteAppelee).toBeFalsy();
    });
  });

  describe("sur demande d'ajout du nonce", () => {
    it('ajoute le nonce à la réponse', async () => {
      await middleware.ajouteLeNonceALaReponse(requete, reponse, () => {});

      expect(reponse.locals.nonce).toBeDefined();
    });

    it('le nonce a une longueur de 32', async () => {
      await middleware.ajouteLeNonceALaReponse(requete, reponse, () => {});

      expect(reponse.locals.nonce).toHaveLength(32);
    });

    it('la suite est appelée', async () => {
      let laSuiteEstAppelee = false;

      await middleware.ajouteLeNonceALaReponse(requete, reponse, () => {
        laSuiteEstAppelee = true;
      });

      expect(laSuiteEstAppelee).toBeTruthy();
    });
  });
});
