import { JwtPayload } from 'jsonwebtoken';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';
import { creeServeur } from '../../src/api/dsc';
import { MoteurDeRendu } from '../../src/api/moteurDeRendu';
import { configurationDeTestDuServeur, fauxAdaptateurJWT } from './fauxObjets';

describe('La ressource création de compte', () => {
  it('injecte les informations professionnelles à partir du token', async () => {
    let vueRendue;
    let donneesInjectees;
    const moteurRendu: MoteurDeRendu = {
      rends: (reponse, vue, options) => {
        vueRendue = vue;
        donneesInjectees = options;
        reponse.sendStatus(200);
      },
    };
    const adaptateurJWT: AdaptateurJWT = {
      ...fauxAdaptateurJWT,
      decode: (token) => {
        if (token === 'TOKEN-jeanne')
          return {
            prenom: 'Jeanne',
            nom: 'Dupont',
            email: 'jeanne.dupont@example.fr',
            siret: '134',
          } as JwtPayload;

        throw new Error('Token invalide');
      },
    };

    const serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      adaptateurJWT,
      moteurDeRendu: moteurRendu,
    });

    await request(serveur).get('/creation-compte?token=TOKEN-jeanne');

    expect(vueRendue).toBe('creation-compte');
    expect(donneesInjectees).toStrictEqual({
      informationsProfessionnelles: {
        prenom: 'Jeanne',
        nom: 'Dupont',
        email: 'jeanne.dupont@example.fr',
        organisation: {
          departement: '86',
          nom: 'TEST',
          siret: '134',
        },
      },
      token: 'TOKEN-jeanne',
    });
  });

  it('renvoie une erreur lorsque le token est absent', async () => {
    const serveur = creeServeur(configurationDeTestDuServeur());

    const reponse = await request(serveur).get('/creation-compte');

    expect(reponse.status).toBe(400);
  });
});
