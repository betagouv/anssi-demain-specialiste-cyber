import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { creeServeur } from '../../src/api/dsc';
import { configurationDeTestDuServeur } from './fauxObjets';
import { encodeSession } from './cookie';

describe('Les ressources de page', () => {
  it("renvoie une page pour les jeux d'un enseignant", async () => {
    const serveur = creeServeur(configurationDeTestDuServeur());
    const cookie = encodeSession({
      token: 'jeton de test',
    });

    const reponse = await request(serveur)
      .get('/mes-jeux')
      .set('Cookie', [cookie]);

    expect(reponse.status).toBe(200);
  });

  it('protège la page des jeux', async () => {
    const serveur = creeServeur(configurationDeTestDuServeur());

    const reponse = await request(serveur).get('/mes-jeux');

    expect(reponse.status).toBe(302);
    expect(reponse.headers.location).toBe('/connexion');
  });
});
