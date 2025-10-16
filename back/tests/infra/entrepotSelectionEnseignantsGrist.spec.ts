import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../../src/infra/recupereRessourceHttp';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import {
  EntrepotSelectionEnseignantsGrist,
  SelectionEnseignantsGrist,
} from '../../src/infra/entrepotSelectionEnseignantsGrist';
import {
  ConstructeurLigneGristSelectionEnseignants,
  ConstructeurReponseSelectionEnseignantsGrist,
} from './constructeurDeSelectionEnseignantsGrist';

describe("L'entrepôt de sélection enseignants Grist ", () => {
  const reponseVide = { records: [] };

  it('sait appeler la bonne ressource', async () => {
    process.env.GRIST_SELECTION_ENSEIGNANTS_ID_DOCUMENT = 'mon_document';
    process.env.GRIST_SELECTION_ENSEIGNANTS_ID_TABLE = 'selection_enseignants';
    let urlAppelee = '';
    const clientHttp: RecupereRessourceHttp<
      ReponseGrist<SelectionEnseignantsGrist>
    > = async (url: string) => {
      urlAppelee = url;
      return reponseVide;
    };
    const entrepotRessourcesCyberGrist = new EntrepotSelectionEnseignantsGrist(
      clientHttp,
    );

    await entrepotRessourcesCyberGrist.tous();

    expect(urlAppelee).toEqual(
      'http://example.com/api/docs/mon_document/tables/selection_enseignants/records',
    );
  });

  it('sait récupérer les sélections enseignants en appelant Grist', async () => {
    const ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseGrist<SelectionEnseignantsGrist>
    > = async () => {
      return new ConstructeurReponseSelectionEnseignantsGrist()
        .ajouteUneLigne(
          new ConstructeurLigneGristSelectionEnseignants()
            .avecColonneId('se-former')
            .avecColonneTitre('Se former')
            .avecColonneExplication("Les explications d'usage")
            .avecColonneRessources(['CyberEnJeux', 'SecNumAcademy'])
            .avecColonneCouleurDeFond('#FFFFFF')
            .construis(),
        )
        .construis();
    };
    const entrepotRessourcesCyberGrist = new EntrepotSelectionEnseignantsGrist(
      ressourcesCyberGrist,
    );

    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    expect(ressourcesCyber[0].id).toBe('se-former');
    expect(ressourcesCyber[0].titre).toBe('Se former');
  });
});
