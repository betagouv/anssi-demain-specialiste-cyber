import { Express } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { creeServeur } from '../src/api/dsc';

describe('La page Catalogue', () => {
  const appelleCatalogue = (serveur: Express) =>
    request(serveur).get('/catalogue');

  it('répond 200', async () => {
    const serveur = creeServeur();

    const reponse = await appelleCatalogue(serveur);

    expect(reponse.status).toEqual(200);
  });

  it('répond avec un contenu HTML', async () => {
    const serveur = creeServeur();

    const reponse = await appelleCatalogue(serveur);

    expect(reponse.headers['content-type']).toEqual('text/html; charset=utf-8');
  });

  it('répond avec le contenu HTML du catalogue', async () => {
    const serveur = creeServeur();

    const reponse = await appelleCatalogue(serveur);

    expect(reponse.text).toMatchSnapshot();
  });
});
