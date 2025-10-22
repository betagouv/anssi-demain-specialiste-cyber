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
    describe('pour un jeu existant', () => {
      let entrepotJeux: EntrepotJeux;
      let serveur: Express;

      beforeEach(async () => {
        entrepotJeux = new EntrepotJeuxMemoire();
        serveur = creeServeur({
          ...configurationDeTestDuServeur(),
          entrepotJeux,
        });

        await entrepotJeux.ajoute(cybercluedo);
      });

      it('retourne un 200', async () => {
        const reponse = await request(serveur).post('/api/jeux/1/reactions');

        const statut = reponse.status;
        expect(statut).toEqual(200);
      });

      it('ajoute une réaction au jeu', async () => {
        cybercluedo.reactions['coeur'] = 4;

        await request(serveur).post('/api/jeux/1/reactions');

        const jeu = await entrepotJeux.parId('1');
        expect(jeu!.reactions['coeur']).toEqual(5);
      });
    });
  });
});
