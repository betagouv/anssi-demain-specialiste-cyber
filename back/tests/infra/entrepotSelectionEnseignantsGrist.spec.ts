import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../../src/infra/recupereRessourceHttp';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import {
  EntrepotSelectionEnseignantsGrist,
  SelectionEnseignantsGrist,
} from '../../src/infra/entrepotSelectionEnseignantsGrist';

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
});
