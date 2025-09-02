import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import { creeServeur } from '../../../src/api/dsc';
import { AgentConnectInfo, encodeSession, enObjet } from '../cookie';
import {
  configurationDeTestDuServeur,
  fauxAdaptateurOIDC,
} from '../fauxObjets';

describe('La ressource deconnexion OIDC', () => {
  describe('quand on requete GET sur /oidc/deconnexion', () => {
    let serveur: Express;
    let idTokenRecu: string;
    beforeEach(() => {
      const adaptateurOIDC = fauxAdaptateurOIDC;
      adaptateurOIDC.genereDemandeDeconnexion = async (idToken: string) => {
        idTokenRecu = idToken;
        return {
          url: 'une-adresse-proconnect',
          state: 'un faux state',
        };
      };
      serveur = creeServeur({
        ...configurationDeTestDuServeur(),
        adaptateurOIDC,
      });
    });

    it('redirige vers url de deconnexion', async () => {
      const cookie = encodeSession({
        AgentConnectIdToken: 'idToken',
      });

      const reponse = await request(serveur)
        .get('/oidc/deconnexion')
        .set('Cookie', [cookie]);

      expect(reponse.status).toEqual(302);
      expect(reponse.headers.location).toEqual('une-adresse-proconnect');
      expect(idTokenRecu).toEqual('idToken');
    });

    it('dépose un cookie avec le state', async () => {
      const cookie = encodeSession({
        AgentConnectIdToken: 'idToken',
      });

      const reponse = await request(serveur)
        .get('/oidc/deconnexion')
        .set('Cookie', [cookie]);
      const headerCookie = reponse.headers['set-cookie'];
      const cookieSession = enObjet(headerCookie[0]);

      expect(
        (cookieSession.AgentConnectInfo as AgentConnectInfo).state
      ).toEqual('un faux state');
    });
  });
});
