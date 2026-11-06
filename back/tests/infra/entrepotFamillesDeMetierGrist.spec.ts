import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../../src/infra/clientHttp';
import { EntrepôtFamillesDeMétierGrist, FamilleDeMetierGrist } from '../../src/infra/entrepotFamillesDeMetierGrist';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import { Fonction } from '../../src/metier/fonction';
import { EntrepôtFonctionsMémoire } from '../api/entrepotFonctionsMemoire';
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
      const clientHttp: RecupereRessourceHttp<ReponseGrist<FamilleDeMetierGrist>> = async (url: string) => {
        urlAppelee = url;
        return { records: [] };
      };
      const entrepotRessourcesCyberGrist = new EntrepôtFamillesDeMétierGrist(
        new EntrepotMetiersMemoire(),
        new EntrepotRessourcesCyberMemoire(),
        new EntrepôtFonctionsMémoire(),
        clientHttp,
      );

      await entrepotRessourcesCyberGrist.tous();

      expect(urlAppelee).toEqual('http://example.com/api/docs/mon_id_document/tables/id_table_familles_metier/records');
    });

    const uneLigneDeFamilleGrist = () =>
      new ConstructeurLigneGristFamillesDeMetier()
        .avecColonneEtValeur('Tuile_1', 'A / B')
        .avecColonneEtValeur('Tuile_2', 'A / B')
        .avecColonneEtValeur('Tuile_3', 'A / B');

    it('sait reconstruire les familles', async () => {
      const famillesDeMetierGrist: RecupereRessourceHttp<ReponseGrist<FamilleDeMetierGrist>> = async () =>
        new ConstructeurRéponseFamillesDeMétierGrist()
          .ajouteUneLigne(
            uneLigneDeFamilleGrist()
              .avecColonneEtValeur('Famille', 'Conception')
              .avecColonneEtValeur('Titre_Hero', 'Conception et maintien...')
              .avecColonneEtValeur('Sous_texte_Hero', 'Concevoir, chiffrer...')
              .avecColonneEtValeur('En_bref', 'La sécurité se prépare...')
              .avecColonneEtValeur('Tuile_1', 'Concevoir / Dessiner des systèmes')
              .avecColonneEtValeur('Tuile_2', 'Chiffrer / Protéger la confidentialité')
              .avecColonneEtValeur('Tuile_3', 'Maintenir / Administrer et mettre à jour'),
          )
          .ajouteUneLigne(uneLigneDeFamilleGrist().avecColonneEtValeur('Famille', 'Pilotage'))
          .construis();
      const entrepôt = new EntrepôtFamillesDeMétierGrist(
        new EntrepotMetiersMemoire(),
        new EntrepotRessourcesCyberMemoire(),
        new EntrepôtFonctionsMémoire(),
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
      const famillesDeMetierGrist: RecupereRessourceHttp<ReponseGrist<FamilleDeMetierGrist>> = async () =>
        new ConstructeurRéponseFamillesDeMétierGrist()
          .ajouteUneLigne(uneLigneDeFamilleGrist().avecColonneEtListeDeValeurs('Profils_de_cette_famille', [13, 17]))
          .construis();
      const entrepôtMétiers = new EntrepotMetiersMemoire();
      await entrepôtMétiers.ajoute(unMetier().avecIdInterne(13).avecTitre('A').construis());
      await entrepôtMétiers.ajoute(unMetier().avecIdInterne(17).avecTitre('B').construis());
      const entrepôt = new EntrepôtFamillesDeMétierGrist(
        entrepôtMétiers,
        new EntrepotRessourcesCyberMemoire(),
        new EntrepôtFonctionsMémoire(),
        famillesDeMetierGrist,
      );

      const familles = await entrepôt.tous();

      expect(familles[0].profils).toHaveLength(2);
      expect(familles[0].profils[0].titre).toBe('A');
      expect(familles[0].profils[1].titre).toBe('B');
    });

    it('sait associer les ressources', async () => {
      const famillesDeMetierGrist: RecupereRessourceHttp<ReponseGrist<FamilleDeMetierGrist>> = async () =>
        new ConstructeurRéponseFamillesDeMétierGrist()
          .ajouteUneLigne(uneLigneDeFamilleGrist().avecColonneEtListeDeValeurs('Ressources_associees', [3, 112]))
          .construis();
      const entrepôtRessourcesCyber = new EntrepotRessourcesCyberMemoire();
      await entrepôtRessourcesCyber.ajoute(uneRessourceCyber().avecId(3).avecTitre('Passe ton Hack').construis());
      await entrepôtRessourcesCyber.ajoute(uneRessourceCyber().avecId(112).avecTitre('Cyber Guide').construis());
      const entrepôt = new EntrepôtFamillesDeMétierGrist(
        new EntrepotMetiersMemoire(),
        entrepôtRessourcesCyber,
        new EntrepôtFonctionsMémoire(),
        famillesDeMetierGrist,
      );

      const familles = await entrepôt.tous();

      expect(familles[0].ressourcesAssociées).toHaveLength(2);
      expect(familles[0].ressourcesAssociées[0].titre).toBe('Passe ton Hack');
      expect(familles[0].ressourcesAssociées[1].titre).toBe('Cyber Guide');
    });

    const uneFonction = (id: number, nom: string): Fonction => ({
      id,
      nom,
      famille: '',
      témoignage: { nom: '', lien: '', femme: true, idVignette: '' },
      missionPrincipale: '',
      lien: '',
    });

    it('sait associer les fonctions', async () => {
      const famillesDeMetierGrist: RecupereRessourceHttp<ReponseGrist<FamilleDeMetierGrist>> = async () =>
        new ConstructeurRéponseFamillesDeMétierGrist()
          .ajouteUneLigne(uneLigneDeFamilleGrist().avecColonneEtListeDeValeurs('Metiers', [5, 10]))
          .construis();
      const entrepôtFonctions = new EntrepôtFonctionsMémoire();
      await entrepôtFonctions.ajoute(uneFonction(5, 'Cryptologue'));
      await entrepôtFonctions.ajoute(uneFonction(10, 'Analyste SOC'));

      const entrepôt = new EntrepôtFamillesDeMétierGrist(
        new EntrepotMetiersMemoire(),
        new EntrepotRessourcesCyberMemoire(),
        entrepôtFonctions,
        famillesDeMetierGrist,
      );

      const familles = await entrepôt.tous();

      expect(familles[0].fonctions).toHaveLength(2);
      expect(familles[0].fonctions[0].nom).toBe('Cryptologue');
      expect(familles[0].fonctions[1].nom).toBe('Analyste SOC');
    });
  });
});
