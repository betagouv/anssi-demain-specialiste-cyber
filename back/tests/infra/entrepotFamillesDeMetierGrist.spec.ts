import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../../src/infra/clientHttp';
import {
  EntrepôtFamillesDeMétierGrist,
  FamilleDeMetierGrist,
} from '../../src/infra/entrepotFamillesDeMetierGrist';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import { unMetier } from '../metier/constructeurMetier';
import { uneRessourceCyber } from '../metier/constructeurRessourceCyber';
import {
  ConstructeurLigneGristFamillesDeMetier,
  ConstructeurRéponseFamillesDeMétierGrist,
} from './constructeurDeFamillesDeMetierGrist';
import { EntrepotMetiersMemoire } from './entrepotMetiersMemoire';
import { EntrepotRessourcesCyberMemoire } from './entrepotRessourceCyberMemoire';

describe('L’entrepôt des familles de métier grist', () => {
  describe('sur demande de toutes les familles', () => {
    it('sait appeler la bonne ressource', async () => {
      let urlAppelee = '';
      const clientHttp: RecupereRessourceHttp<
        ReponseGrist<FamilleDeMetierGrist>
      > = async (url: string) => {
        urlAppelee = url;
        return { records: [] };
      };
      const entrepotRessourcesCyberGrist = new EntrepôtFamillesDeMétierGrist(
        new EntrepotMetiersMemoire(),
        new EntrepotRessourcesCyberMemoire(),
        clientHttp,
      );

      await entrepotRessourcesCyberGrist.tous();

      expect(urlAppelee).toEqual(
        'http://example.com/api/docs/mon_id_document/tables/id_table_familles_metier/records',
      );
    });

    it('sait reconstruire les familles', async () => {
      const famillesDeMetierGrist: RecupereRessourceHttp<
        ReponseGrist<FamilleDeMetierGrist>
      > = async () =>
        new ConstructeurRéponseFamillesDeMétierGrist()
          .ajouteUneLigne(
            new ConstructeurLigneGristFamillesDeMetier()
              .avecColonneEtValeur('Famille', 'Conception')
              .avecColonneEtValeur('Titre_Hero', 'Conception et maintien...')
              .avecColonneEtValeur('Sous_texte_Hero', 'Concevoir, chiffrer...')
              .avecColonneEtValeur('En_bref', 'La sécurité se prépare...')
              .avecColonneEtValeur(
                'Tuile_1',
                'Concevoir / Dessiner des systèmes',
              )
              .avecColonneEtValeur(
                'Tuile_2',
                'Chiffrer / Protéger la confidentialité',
              )
              .avecColonneEtValeur(
                'Tuile_3',
                'Maintenir / Administrer et mettre à jour',
              )
              .construis(),
          )
          .ajouteUneLigne(
            new ConstructeurLigneGristFamillesDeMetier()
              .avecColonneEtValeur('Famille', 'Pilotage')
              .avecColonneEtValeur('Tuile_1', 'A / B')
              .avecColonneEtValeur('Tuile_2', 'A / B')
              .avecColonneEtValeur('Tuile_3', 'A / B')
              .construis(),
          )
          .construis();
      const entrepôt = new EntrepôtFamillesDeMétierGrist(
        new EntrepotMetiersMemoire(),
        new EntrepotRessourcesCyberMemoire(),
        famillesDeMetierGrist,
      );

      const familles = await entrepôt.tous();

      expect(familles).toHaveLength(2);
      expect(familles[0].code).toBe('Conception');
      expect(familles[0].titre).toBe('Conception et maintien...');
      expect(familles[0].sousTitre).toBe('Concevoir, chiffrer...');
      expect(familles[0].description).toBe('La sécurité se prépare...');
      expect(familles[0].rôles).toStrictEqual([
        { nom: 'Concevoir', description: 'Dessiner des systèmes' },
        { nom: 'Chiffrer', description: 'Protéger la confidentialité' },
        { nom: 'Maintenir', description: 'Administrer et mettre à jour' },
      ]);
    });

    it('sait associer les profils', async () => {
      const famillesDeMetierGrist: RecupereRessourceHttp<
        ReponseGrist<FamilleDeMetierGrist>
      > = async () =>
        new ConstructeurRéponseFamillesDeMétierGrist()
          .ajouteUneLigne(
            new ConstructeurLigneGristFamillesDeMetier()
              .avecColonneEtValeur('Tuile_1', 'A / B')
              .avecColonneEtValeur('Tuile_2', 'A / B')
              .avecColonneEtValeur('Tuile_3', 'A / B')
              .avecColonneEtListeDeValeurs('Profils_de_cette_famille', [13, 17])
              .construis(),
          )
          .construis();
      const entrepôtMétiers = new EntrepotMetiersMemoire();
      await entrepôtMétiers.ajoute(
        unMetier().avecId(13).avecTitre('A').construis(),
      );
      await entrepôtMétiers.ajoute(
        unMetier().avecId(17).avecTitre('B').construis(),
      );
      const entrepôt = new EntrepôtFamillesDeMétierGrist(
        entrepôtMétiers,
        new EntrepotRessourcesCyberMemoire(),
        famillesDeMetierGrist,
      );

      const familles = await entrepôt.tous();

      expect(familles[0].profils).toHaveLength(2);
      expect(familles[0].profils[0].titre).toBe('A');
      expect(familles[0].profils[1].titre).toBe('B');
    });

    it('sait associer les ressources', async () => {
      const famillesDeMetierGrist: RecupereRessourceHttp<
        ReponseGrist<FamilleDeMetierGrist>
      > = async () =>
        new ConstructeurRéponseFamillesDeMétierGrist()
          .ajouteUneLigne(
            new ConstructeurLigneGristFamillesDeMetier()
              .avecColonneEtValeur('Tuile_1', 'A / B')
              .avecColonneEtValeur('Tuile_2', 'A / B')
              .avecColonneEtValeur('Tuile_3', 'A / B')
              .avecColonneEtListeDeValeurs('Ressources_associees', [3, 112])
              .construis(),
          )
          .construis();
      const entrepôtRessourcesCyber = new EntrepotRessourcesCyberMemoire();
      await entrepôtRessourcesCyber.ajoute(
        uneRessourceCyber().avecId(3).avecTitre('Passe ton Hack').construis(),
      );
      await entrepôtRessourcesCyber.ajoute(
        uneRessourceCyber().avecId(112).avecTitre('Cyber Guide').construis(),
      );
      const entrepôt = new EntrepôtFamillesDeMétierGrist(
        new EntrepotMetiersMemoire(),
        entrepôtRessourcesCyber,
        famillesDeMetierGrist,
      );

      const familles = await entrepôt.tous();

      expect(familles[0].ressourcesAssociées).toHaveLength(2);
      expect(familles[0].ressourcesAssociées[0].titre).toBe('Passe ton Hack');
      expect(familles[0].ressourcesAssociées[1].titre).toBe('Cyber Guide');
    });
  });
});
