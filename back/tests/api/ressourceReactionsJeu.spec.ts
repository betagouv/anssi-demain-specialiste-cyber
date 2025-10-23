import { beforeEach, describe, expect, it } from 'vitest';
import { creeServeur } from '../../src/api/dsc';
import { configurationDeTestDuServeur } from './fauxObjets';
import request from 'supertest';
import { cybercluedo } from './objetsPretsALEmploi';
import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';

import { Express } from 'express';

describe("La ressource des réactions d'un jeu", () => {
  describe('sur un POST', () => {
    let entrepotJeux: EntrepotJeux;
    let serveur: Express;

    beforeEach(async () => {
      entrepotJeux = new EntrepotJeuxMemoire();
      serveur = creeServeur({
        ...configurationDeTestDuServeur(),
        entrepotJeux,
      });
    });

    describe('pour un jeu existant', () => {
      beforeEach(async () => {
        await entrepotJeux.ajoute(cybercluedo);
      });

      it('retourne un 200', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'ajout', type: '❤️' });

        const statut = reponse.status;
        expect(statut).toEqual(200);
      });

      it('ajoute une réaction au jeu', async () => {
        cybercluedo.reactions['❤️'] = 4;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'ajout', type: '❤️' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['❤️']).toEqual(5);
      });

      it('retire une réaction au jeu ', async () => {
        cybercluedo.reactions['❤️'] = 11;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'retrait', type: '❤️' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['❤️']).toEqual(10);
      });

      it("ne fais rien si l'action est inconnue", async () => {
        cybercluedo.reactions['❤️'] = 10;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'inconnue' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['❤️']).toEqual(10);
      });

      it('ajoute une réaction feu', async () => {
        cybercluedo.reactions['🔥'] = 9;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'ajout', type: '🔥' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['🔥']).toEqual(10);
      });

      it('retire une réaction feu', async () => {
        cybercluedo.reactions['🔥'] = 10;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'retrait', type: '🔥' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['🔥']).toEqual(9);
      });

      it('retourne une erreur 400 si le type est inconnu', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'ajout', type: 'loremipsum' });

        const statut = reponse.status;
        expect(statut).toEqual(400);
      });
    });

    describe('pour un jeu inexistant', () => {
      it('retourne un 404', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux/999/reactions')
          .send({ action: 'ajout', type: '❤️' });

        const statut = reponse.status;
        expect(statut).toEqual(404);
      });
    });
  });
});
