import { beforeEach, describe, expect, it } from 'vitest';
import { ConfigurationServeur } from '../../src/api/configurationServeur';
import { Express } from 'express';
import request from 'supertest';
import { configurationDeTestDuServeur } from './fauxObjets';
import { creeServeur } from '../../src/api/dsc';
import { uneSelection } from '../metier/constructeurSelection';
import { EntrepotRessourcesCyberMemoire } from '../infra/entrepotRessourceCyberMemoire';
import { EntrepotSelectionsElevesMemoire } from '../infra/entrepotSelectionsElevesMemoire';

describe('La ressource sélection élèves', () => {
  let entrepotRessourcesCyber: EntrepotRessourcesCyberMemoire;
  let entrepotSelectionsEleves: EntrepotSelectionsElevesMemoire;
  let configuration: ConfigurationServeur;
  let serveur: Express;

  beforeEach(() => {
    entrepotRessourcesCyber = new EntrepotRessourcesCyberMemoire();
    entrepotSelectionsEleves = new EntrepotSelectionsElevesMemoire();
    configuration = configurationDeTestDuServeur();
    serveur = creeServeur({
      ...configuration,
      entrepotSelectionsEleves,
      entrepotRessourcesCyber,
    });
  });

  describe('sur une demande GET', () => {
    it('renvoie un 200', async () => {
      const reponse = await request(serveur).get('/api/selections-eleves');
      expect(reponse.status).toEqual(200);
    });

    it('retourne la liste des sélections', async () => {
      await entrepotSelectionsEleves.ajoute(
        uneSelection()
          .avecUnId('former')
          .avecUnTitre('Former')
          .avecUneExplication('Former lorem ipsum')
          .construis(),
      );
      await entrepotSelectionsEleves.ajoute(
        uneSelection()
          .avecUnId('se-former')
          .avecUnTitre('Se former')
          .avecUneExplication('Se former lorem ipsum')
          .construis(),
      );

      const reponse = await request(serveur).get('/api/selections-eleves');

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
