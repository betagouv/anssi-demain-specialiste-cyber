import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../../src/infra/clientHttp';
import {
  EntrepôtFamillesDeMétierGrist,
  FamilleDeMetierGrist,
} from '../../src/infra/entrepotFamillesDeMetierGrist';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import {
  ConstructeurLigneGristFamillesDeMetier,
  ConstructeurRéponseFamillesDeMétierGrist,
} from './constructeurDeFamillesDeMetierGrist';

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
      const entrepôt = new EntrepôtFamillesDeMétierGrist(famillesDeMetierGrist);

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
  });
});
