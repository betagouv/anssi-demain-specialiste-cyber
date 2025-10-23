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
        const reponse = await request(serveur).post('/api/jeux/1/reactions');

        const statut = reponse.status;
        expect(statut).toEqual(200);
      });

      it('ajoute une réaction au jeu', async () => {
        cybercluedo.reactions['coeur'] = 4;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'ajout', type: 'coeur' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['coeur']).toEqual(5);
      });

      it('retire une réaction au jeu ', async () => {
        cybercluedo.reactions['coeur'] = 11;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'retrait', type: 'coeur' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['coeur']).toEqual(10);
      });

      it("ne fais rien si l'action est inconnue", async () => {
        cybercluedo.reactions['coeur'] = 10;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'inconnue' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['coeur']).toEqual(10);
      });

      it('ajoute une réaction feu', async () => {
        cybercluedo.reactions['feu'] = 9;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'ajout', type: 'feu' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['feu']).toEqual(10);
      });

      it('retire une réaction feu', async () => {
        cybercluedo.reactions['feu'] = 10;

        await request(serveur)
          .post('/api/jeux/1/reactions')
          .send({ action: 'retrait', type: 'feu' });

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['feu']).toEqual(9);
      });
    });

    describe('pour un jeu inexistant', () => {
      it('retourne un 404', async () => {
        const reponse = await request(serveur)
          .post('/api/jeux/999/reactions')
          .send({ action: 'ajout', type: 'coeur' });

        const statut = reponse.status;
        expect(statut).toEqual(404);
      });
    });
  });
});
