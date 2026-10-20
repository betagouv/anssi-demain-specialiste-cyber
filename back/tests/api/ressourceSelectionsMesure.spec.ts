import { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { ConfigurationServeur } from '../../src/api/configurationServeur';
import { creeServeur } from '../../src/api/dsc';
import { EntrepotRessourcesCyberMemoire } from '../infra/entrepotRessourceCyberMemoire';
import { EntrepotSelectionsMemoire } from '../infra/entrepotSelectionsMemoire';
import { uneSelection } from '../metier/constructeurSelection';
import { configurationDeTestDuServeur } from './fauxObjets';

describe('La ressource sélection entrainement', () => {
  let entrepotRessourcesCyber: EntrepotRessourcesCyberMemoire;
  let entrepôtSélectionsMesure: EntrepotSelectionsMemoire;
  let configuration: ConfigurationServeur;
  let serveur: Express;

  beforeEach(() => {
    entrepotRessourcesCyber = new EntrepotRessourcesCyberMemoire();
    entrepôtSélectionsMesure = new EntrepotSelectionsMemoire();
    configuration = configurationDeTestDuServeur();
    serveur = creeServeur({
      ...configuration,
      entrepôtSélectionsMesure: entrepôtSélectionsMesure,
      entrepotRessourcesCyber,
    });
  });

  describe('sur une demande GET', () => {
    it('renvoie un 200', async () => {
      const reponse = await request(serveur).get('/api/selections-mesure');
      expect(reponse.status).toEqual(200);
    });

    it('retourne la liste des sélections', async () => {
      await entrepôtSélectionsMesure.ajoute(
        uneSelection()
          .avecUnId('former')
          .avecUnTitre('Former')
          .avecUneExplication('Former lorem ipsum')
          .construis(),
      );
      await entrepôtSélectionsMesure.ajoute(
        uneSelection()
          .avecUnId('se-former')
          .avecUnTitre('Se former')
          .avecUneExplication('Se former lorem ipsum')
          .construis(),
      );

      const reponse = await request(serveur).get('/api/selections-mesure');

      expect(reponse.body).toStrictEqual([
        {
          id: 'former',
          titre: 'Former',
          explication: 'Former lorem ipsum',
          ressources: [],
        },
        {
          id: 'se-former',
          titre: 'Se former',
          explication: 'Se former lorem ipsum',
          ressources: [],
        },
      ]);
    });
  });
});
