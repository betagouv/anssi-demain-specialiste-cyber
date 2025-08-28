import { Express } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { creeServeur } from '../src/api/dsc';
import { configurationDeTestDuServeur } from './api/fauxObjets';

describe('La page Catalogue', () => {
  const serveur = creeServeur(configurationDeTestDuServeur);

  const appelleCatalogue = (serveur: Express) =>
    request(serveur).get('/catalogue');

  it('répond 200', async () => {
    const reponse = await appelleCatalogue(serveur);

    expect(reponse.status).toEqual(200);
  });

  it('répond avec un contenu HTML', async () => {
    const reponse = await appelleCatalogue(serveur);

    expect(reponse.headers['content-type']).toEqual('text/html; charset=utf-8');
  });

  it('répond avec le contenu HTML du catalogue', async () => {
    const reponse = await appelleCatalogue(serveur);

    expect(reponse.text).toMatchSnapshot();
  });
});
