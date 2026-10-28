import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { unMetier } from '../metier/constructeurMetier';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource métiers', () => {
  it('renvoie le métier', async () => {
    const configurationServeur = configurationDeTestDuServeur();
    const metier = unMetier().construis();
    await configurationServeur.entrepotMetier.ajoute(metier);

    const serveur = creeServeur(configurationServeur);
    const reponse = await request(serveur).get(`/api/metiers/${metier.id}`);

    expect(reponse.status).toBe(200);
    expect(reponse.body.titre).toBe('Un titre');
    expect(reponse.body.fonction).toBe('Une fonction');
    expect(reponse.body.description).toBe('Une description');
  });

  it('renvoie un 404 si le métier n’existe pas', async () => {
    const configurationServeur = configurationDeTestDuServeur();

    const serveur = creeServeur(configurationServeur);
    const reponse = await request(serveur).get('/api/metiers/1000');

    expect(reponse.status).toBe(404);
  });

  it('renvoie une liste de vidéos', async () => {
    const configurationServeur = configurationDeTestDuServeur();
    const metier = unMetier().construis();
    metier.liens.videos = ['https://video1.example', 'https://video2.example'];
    await configurationServeur.entrepotMetier.ajoute(metier);

    const serveur = creeServeur(configurationServeur);
    const reponse = await request(serveur).get(`/api/metiers/${metier.id}`);

    expect(reponse.status).toBe(200);
    expect(reponse.body.liens.videos).toEqual(metier.liens.videos);
  });
});
