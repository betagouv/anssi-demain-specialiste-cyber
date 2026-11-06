import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { ConfigurationServeur } from '../../src/api/configurationServeur';
import { creeServeur } from '../../src/api/dsc';
import { unMetier } from '../metier/constructeurMetier';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource métiers', () => {
  let configurationServeur: ConfigurationServeur;
  let serveur: Express;

  beforeEach(() => {
    configurationServeur = configurationDeTestDuServeur();
    serveur = creeServeur(configurationServeur);
  });

  it('renvoie le métier', async () => {
    const metier = unMetier().construis();
    await configurationServeur.entrepotMetier.ajoute(metier);

    const reponse = await request(serveur).get(`/api/metiers/${metier.id}`);

    expect(reponse.status).toBe(200);
    expect(reponse.body.titre).toBe('Un titre');
    expect(reponse.body.fonction).toBe('Une fonction');
    expect(reponse.body.description).toBe('Une description');
  });

  it('renvoie un 404 si le métier n’existe pas', async () => {
    const reponse = await request(serveur).get('/api/metiers/1000');

    expect(reponse.status).toBe(404);
  });

  it('renvoie une liste de vidéos', async () => {
    const metier = unMetier().construis();
    metier.liens.videos = ['https://video1.example', 'https://video2.example'];
    await configurationServeur.entrepotMetier.ajoute(metier);

    const reponse = await request(serveur).get(`/api/metiers/${metier.id}`);

    expect(reponse.status).toBe(200);
    expect(reponse.body.liens.videos).toEqual(metier.liens.videos);
  });

  it('conserve l’id interne non exposé', async () => {
    const metier = unMetier().avecIdInterne(111).construis();
    await configurationServeur.entrepotMetier.ajoute(metier);

    const reponse = await request(serveur).get(`/api/metiers/${metier.id}`);

    expect(reponse.body.idInterne).toBeUndefined();
  });
});
