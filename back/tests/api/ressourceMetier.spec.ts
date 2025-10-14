import { describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { configurationDeTestDuServeur } from './fauxObjets';
import request from 'supertest';
import { Constructeur } from '../constructeur';
import { Metier } from '../../src/metier/metier';

class ConstructeurMetier implements Constructeur<Metier> {
  private id: number = Math.round(Math.random() * 1000);

  construis(): Metier {
    return {
      id: this.id,
    };
  }
}

const unMetier = () => new ConstructeurMetier();

describe('La ressource métiers', () => {
  it('renvoie le métier', async () => {
    const configurationServeur = configurationDeTestDuServeur();
    const metier = unMetier().construis();
    await configurationServeur.entrepotMetier.ajoute(metier);

    const serveur = creeServeur(configurationServeur);
    const reponse = await request(serveur).get(`/api/metiers/${metier.id}`);

    expect(reponse.status).toBe(200);
  });

  it('renvoie un 404 si le métier n’existe pas', async () => {
    const configurationServeur = configurationDeTestDuServeur();

    const serveur = creeServeur(configurationServeur);
    const reponse = await request(serveur).get('/api/metiers/1000');

    expect(reponse.status).toBe(404);
  });
});
