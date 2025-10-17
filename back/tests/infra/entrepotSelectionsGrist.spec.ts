import { beforeEach, describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../../src/infra/recupereRessourceHttp';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import {
  EntrepotSelectionsGrist,
  SelectionGrist,
} from '../../src/infra/entrepotSelectionsGrist';
import {
  ConstructeurLigneGristSelections,
  ConstructeurReponseSelectionsGrist,
} from './constructeurDeSelectionsGrist';
import { RessourceCyber } from '../../src/metier/ressourceCyber';
import { EntrepotRessourcesCyberMemoire } from './entrepotRessourceCyberMemoire';
import { EntrepotRessourcesCyber } from '../../src/metier/entrepotRessourcesCyber';

describe("L'entrepôt de sélections Grist ", () => {
  const reponseVide = { records: [] };
  let entrepotRessourcesCyber: EntrepotRessourcesCyber;

  beforeEach(() => {
    entrepotRessourcesCyber = new EntrepotRessourcesCyberMemoire();
  });

  it('sait appeler la bonne ressource', async () => {
    let urlAppelee = '';
    const clientHttp: RecupereRessourceHttp<
      ReponseGrist<SelectionGrist>
    > = async (url: string) => {
      urlAppelee = url;
      return reponseVide;
    };
    const entrepotRessourcesCyberGrist = new EntrepotSelectionsGrist(
      entrepotRessourcesCyber,
      { idTable: 'selection_enseignants' },
      clientHttp,
    );

    await entrepotRessourcesCyberGrist.tous();

    expect(urlAppelee).toEqual(
      'http://example.com/api/docs/mon_id_document/tables/selection_enseignants/records',
    );
  });

  it('sait récupérer les sélections en appelant Grist', async () => {
    const ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseGrist<SelectionGrist>
    > = async () => {
      return new ConstructeurReponseSelectionsGrist()
        .ajouteUneLigne(
          new ConstructeurLigneGristSelections()
            .avecColonneId('se-former')
            .avecColonneTitre('Se former')
            .construis(),
        )
        .construis();
    };
    const entrepotRessourcesCyberGrist = new EntrepotSelectionsGrist(
      entrepotRessourcesCyber,
      { idTable: 'selection_enseignants' },
      ressourcesCyberGrist,
    );

    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    expect(ressourcesCyber[0].id).toBe('se-former');
    expect(ressourcesCyber[0].titre).toBe('Se former');
  });

  it('sait récupérer les ressources cyber', async () => {
    const osintProject: RessourceCyber = {
      id: 13,
      titre: 'The Osint Project',
      besoins: [],
      types: [],
      description: '',
      estCertifiee: false,
      lienExterne: '',
      niveaux: [],
      publicsCible: [],
      thematiques: [],
      urlIllustration: '',
    };
    await entrepotRessourcesCyber.ajoute(osintProject);

    const ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseGrist<SelectionGrist>
    > = async () =>
      new ConstructeurReponseSelectionsGrist()
        .ajouteUneLigne(
          new ConstructeurLigneGristSelections()
            .avecColonneId('se-former')
            .avecColonneRessources([13])
            .construis(),
        )
        .construis();
    const entrepotRessourcesCyberGrist = new EntrepotSelectionsGrist(
      entrepotRessourcesCyber,
      { idTable: 'selection_enseignants' },
      ressourcesCyberGrist,
    );

    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    const ressource = ressourcesCyber[0].ressources[0];
    expect(ressource.titre).toBe('The Osint Project');
  });
});
