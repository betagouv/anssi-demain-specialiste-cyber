import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { EntrepotUtilisateur } from '../../src/metier/entrepotUtilisateur';
import { Utilisateur } from '../../src/metier/utilisateur';
import { EntrepotUtilisateurMemoire } from '../infra/entrepotUtilisateurMemoire';
import { encodeSession } from './cookie';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource Profil', () => {
  let serveur: Express;
  let entrepotUtilisateur: EntrepotUtilisateur;

  const jeanneDupont = new Utilisateur({
    email: 'jeanne.dupont@mail.com',
    cguAcceptees: true,
    infolettreAcceptee: true,
    prenom: '',
    nom: '',
    siretEntite: '',
  });

  beforeEach(() => {
    entrepotUtilisateur = new EntrepotUtilisateurMemoire();
    entrepotUtilisateur.ajoute(jeanneDupont);
    serveur = creeServeur({
      ...configurationDeTestDuServeur(),
      entrepotUtilisateur,
    });
  });

  describe('sur demande GET', () => {
    it('répond 200', async () => {
      const reponse = await request(serveur).get('/api/profil');

      expect(reponse.status).toEqual(200);
    });

    it("renvoie les informations de l'utilisateur", async () => {
      const cookie = encodeSession({
        email: 'jeanne.dupont@mail.com',
      });

      const reponse = await request(serveur)
        .get('/api/profil')
        .set('Cookie', [cookie]);

      expect(reponse.body.email).toEqual('jeanne.dupont@mail.com');
    });
  });
});
