import { describe, expect, it } from 'vitest';
import {
  EntrepotRessourcesCyberGrist,
  ReponseRessourceCyberGrist,
} from '../../src/infra/entrepotRessourcesCyberGrist';
import { RecupereRessourceHttp } from '../../src/infra/recupereRessourceHttp';
import { RessourceCyber } from '../../src/metier/ressourceCyber';

describe("L'entrepôt de ressources cyber Grist ", () => {
  const reponseVide = { records: [] };

  it('sait appeler la bonne ressource', async () => {
    let urlAppelee = '';
    const clientHttp: RecupereRessourceHttp<
      ReponseRessourceCyberGrist
    > = async (url: string) => {
      urlAppelee = url;
      return reponseVide;
    };
    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      clientHttp
    );

    await entrepotRessourcesCyberGrist.tous();

    expect(urlAppelee).toEqual(
      'http://example.com/api/docs/mon_id_document/tables/mon_id_table/records'
    );
  });

  it("vérifie l'entête d'authentification", async () => {
    let enteteAuthorisation: string | undefined = undefined;
    const ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseRessourceCyberGrist
    > = async (_url: string, config) => {
      enteteAuthorisation = config?.headers?.['authorization'];
      return reponseVide;
    };
    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      ressourcesCyberGrist
    );

    await entrepotRessourcesCyberGrist.tous();

    expect(enteteAuthorisation).toEqual('Bearer ma_cle_api');
  });

  it('sait récupérer des ressources Cyber en appelant Grist', async () => {
    const ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseRessourceCyberGrist
    > = async () => {
      return new ConstructeurReponseRessourceCyberGrist()
        .ajouteUneLigne(
          new ConstructeurLigneGrist()
            .avecId(1)
            .avecTitre('CyberEnJeux')
            .construis()
        )
        .construis();
    };
    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      ressourcesCyberGrist
    );

    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    expect(ressourcesCyber).toStrictEqual<RessourceCyber[]>([
      {
        id: 1,
        titre: 'CyberEnJeux',
        thematiques: [],
        selections: [],
        niveaux: [],
      },
    ]);
  });

  it('sait récupérer des ressources Cyber en appelant Grist avec la colonne thématiques', async () => {
    const ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseRessourceCyberGrist
    > = async () => {
      return new ConstructeurReponseRessourceCyberGrist()
        .ajouteUneLigne(
          new ConstructeurLigneGrist()
            .avecThematiques([
              'Techniques de sécurité numérique',
              'Comportements numériques',
              'Valoriser les talents féminins',
            ])
            .construis()
        )
        .construis();
    };
    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      ressourcesCyberGrist
    );

    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    expect(ressourcesCyber[0].thematiques).toStrictEqual([
      'Techniques de sécurité numérique',
      'Comportements numériques',
      'Valoriser les talents féminins',
    ]);
  });

  it('sait récupérer des ressources Cyber en appelant Grist avec la colonne sélection', async () => {
    const ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseRessourceCyberGrist
    > = async () => {
      return new ConstructeurReponseRessourceCyberGrist()
        .ajouteUneLigne(
          new ConstructeurLigneGrist()
            .avecSelections(['Parents', 'Élèves'])
            .construis()
        )
        .construis();
    };

    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      ressourcesCyberGrist
    );
    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    expect(ressourcesCyber[0].selections).toStrictEqual(['Parents', 'Élèves']);
  });

  it('sait récupérer des ressources Cyber en appelant Grist avec la colonne niveau', async () => {
    const ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseRessourceCyberGrist
    > = async () => {
      return new ConstructeurReponseRessourceCyberGrist()
        .ajouteUneLigne(
          new ConstructeurLigneGrist()
            .avecNiveaux(['Cycle 1', 'Cycle 2'])
            .construis()
        )
        .construis();
    };

    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      ressourcesCyberGrist
    );
    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    expect(ressourcesCyber[0].niveaux).toStrictEqual(['Cycle 1', 'Cycle 2']);
  });
});

type LigneGrist = {
  id: number;
  titre: string;
  thematiques: string[];
  cibles: string[];
  cycles: string[];
};

interface ConstructeurDeTest<T> {
  construis(): T;
}

class ConstructeurLigneGrist implements ConstructeurDeTest<LigneGrist> {
  _idLigne: number = 0;
  _titreLigne: string = '';
  _thematiques: string[] = [];
  _cibles: string[] = [];
  _cycles: string[] = [];

  avecId(id: number): ConstructeurLigneGrist {
    this._idLigne = id;
    return this;
  }

  avecTitre(titre: string): ConstructeurLigneGrist {
    this._titreLigne = titre;
    return this;
  }

  avecThematiques(thematiques: string[]): ConstructeurLigneGrist {
    this._thematiques = ['L', ...thematiques];
    return this;
  }

  avecSelections(selections: string[]): ConstructeurLigneGrist {
    this._cibles = ['L', ...selections];
    return this;
  }

  avecNiveaux(niveaux: string[]): ConstructeurLigneGrist {
    this._cycles = ['L', ...niveaux];
    return this;
  }

  construis(): LigneGrist {
    return {
      id: this._idLigne,
      titre: this._titreLigne,
      thematiques: this._thematiques,
      cibles: this._cibles,
      cycles: this._cycles,
    };
  }
}

class ConstructeurReponseRessourceCyberGrist
  implements ConstructeurDeTest<ReponseRessourceCyberGrist>
{
  private _lignes: LigneGrist[] = [];

  ajouteUneLigne(ligne: LigneGrist): ConstructeurReponseRessourceCyberGrist {
    this._lignes.push(ligne);
    return this;
  }

  construis(): ReponseRessourceCyberGrist {
    return {
      records: this._lignes.map((l) => ({
        id: l.id,
        fields: {
          A: '',
          Titre: l.titre,
          Description: '',
          Besoins: [],
          Thematiques: l.thematiques,
          Type: [],
          Cible: l.cibles,
          Parcours_sur_page: [],
          Label_DSC: false,
          Cycle_si_eleves: l.cycles,
          Porteur: [],
          Lien: '',
        },
      })),
    };
  }
}
