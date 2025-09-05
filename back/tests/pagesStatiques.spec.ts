import { Express } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { creeServeur } from '../src/api/dsc';
import { configurationDeTestDuServeur } from './api/fauxObjets';

describe('Le serveur de pages statiques', () => {
  const serveur = creeServeur(configurationDeTestDuServeur());

  const appelleUnePageStatique = (serveur: Express) =>
    request(serveur).get('/');

  it('répond 200', async () => {
    const reponse = await appelleUnePageStatique(serveur);

    expect(reponse.status).toEqual(200);
  });

  it('répond avec un contenu HTML', async () => {
    const reponse = await appelleUnePageStatique(serveur);

    expect(reponse.headers['content-type']).toEqual('text/html; charset=UTF-8');
  });

  it('répond avec le contenu HTML', async () => {
    const reponse = await appelleUnePageStatique(serveur);

    expect(reponse.text).toMatchSnapshot();
  });
});
