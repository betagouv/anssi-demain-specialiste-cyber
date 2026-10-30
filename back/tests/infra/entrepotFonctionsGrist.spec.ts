import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../../src/infra/clientHttp';
import {
  EntrepôtFonctionsGrist,
  FonctionGrist,
} from '../../src/infra/entrepotFonctionsGrist';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import {
  ConstructeurLigneGristFonctions,
  ConstructeurRéponseFonctionsGrist,
} from './constructeurDeFonctionsGrist';

describe('L’entrepôt des fonctions grist', () => {
  describe('sur demande de toutes les fonctions', () => {
    it('sait appeler la bonne ressource', async () => {
      let urlAppelee = '';
      const clientHttp: RecupereRessourceHttp<
        ReponseGrist<FonctionGrist>
      > = async (url: string) => {
        urlAppelee = url;
        return { records: [] };
      };
      const entrepôt = new EntrepôtFonctionsGrist(clientHttp);

      await entrepôt.tous();

      expect(
        urlAppelee.startsWith(
          'http://example.com/api/docs/mon_id_document/sql/?q=select%20Temoignages_et_fonctions.*,%20id_table_metiers.Famille_de_metiers%20from%20Temoignages_et_fonctions%20inner%20join%20id_table_metiers%20on%20id_table_metiers.id=Temoignages_et_fonctions.Famille_metiers',
        ),
      ).toBeTruthy();
    });

    it('sait reconstruire les fonctions', async () => {
      const fonctionsGrist: RecupereRessourceHttp<
        ReponseGrist<FonctionGrist>
      > = async () =>
        new ConstructeurRéponseFonctionsGrist()
          .ajouteUneLigne(
            new ConstructeurLigneGristFonctions()
              .avecColonneEtValeur('Fonction', 'Cryptologue')
              .avecColonneEtValeur(
                'Mission_principale',
                'Met au point des systèmes de chiffrement.',
              )
              .avecColonneEtValeur('Lien', 'https://exemple.fr/cryptologue')
              .avecColonneEtValeur('Temoignages', 'Mélissa Rossi')
              .avecColonneEtValeur(
                'Lien_du_temoignage',
                'https://exemple.fr/temoignage',
              )
              .avecColonneEtValeur('Femme_de_la_cyber', true)
              .construis(),
          )
          .ajouteUneLigne(
            new ConstructeurLigneGristFonctions()
              .avecColonneEtValeur('Fonction', 'Analyste SOC')
              .avecColonneEtValeur('Femme_de_la_cyber', false)
              .construis(),
          )
          .construis();
      const entrepôt = new EntrepôtFonctionsGrist(fonctionsGrist);

      const fonctions = await entrepôt.tous();

      expect(fonctions).toHaveLength(2);
      expect(fonctions[0]).toStrictEqual({
        nom: 'Cryptologue',
        famille: '',
        missionPrincipale: 'Met au point des systèmes de chiffrement.',
        lien: 'https://exemple.fr/cryptologue',
        témoignage: {
          nom: 'Mélissa Rossi',
          femme: true,
          lien: 'https://exemple.fr/temoignage',
        },
      });
      expect(fonctions[1].nom).toBe('Analyste SOC');
      expect(fonctions[1].témoignage.femme).toBe(false);
    });

    it('ne prend que le premier lien du témoignage', async () => {
      const fonctionsGrist: RecupereRessourceHttp<
        ReponseGrist<FonctionGrist>
      > = async () =>
        new ConstructeurRéponseFonctionsGrist()
          .ajouteUneLigne(
            new ConstructeurLigneGristFonctions()
              .avecColonneEtValeur(
                'Lien_du_temoignage',
                'https://exemple.fr/temoignage ; Autre lien que je veux pas',
              )
              .construis(),
          )
          .construis();
      const entrepôt = new EntrepôtFonctionsGrist(fonctionsGrist);

      const fonctions = await entrepôt.tous();

      expect(fonctions[0].témoignage.lien).toBe(
        'https://exemple.fr/temoignage',
      );
    });

    it('récupère le nom de la famille', async () => {
      const fonctionsGrist: RecupereRessourceHttp<
        ReponseGrist<FonctionGrist>
      > = async () =>
        new ConstructeurRéponseFonctionsGrist()
          .ajouteUneLigne(
            new ConstructeurLigneGristFonctions()
              .avecColonneEtValeur('Famille_de_metiers', 'Pilotage')
              .construis(),
          )
          .construis();
      const entrepôt = new EntrepôtFonctionsGrist(fonctionsGrist);

      const fonctions = await entrepôt.tous();

      expect(fonctions[0].famille).toBe('Pilotage');
    });

    it('ne retourne que les fonctions publiées', async () => {
      let urlAppelee = '';
      const clientHttp: RecupereRessourceHttp<
        ReponseGrist<FonctionGrist>
      > = async (url: string) => {
        urlAppelee = url;
        return { records: [] };
      };
      const entrepôt = new EntrepôtFonctionsGrist(clientHttp);

      await entrepôt.tous();

      expect(
        urlAppelee.endsWith('%20where%20Publie%20is%20not%20null'),
      ).toBeTruthy();
    });
  });
});
