import { describe, expect, it } from 'vitest';
import {
  EntrepotRessourcesCyberGrist,
  ReponseRessourceCyberGrist,
} from '../../src/infra/entrepotRessourcesCyberGrist';
import { RecupereRessourceHttp } from '../../src/infra/recupereRessourceHttp';
import { RessourceCyber } from '../../src/metier/ressourceCyber';

type LigneGrist = {
  id: number;
  titre: string;
};

interface ConstructeurDeTest<T> {
  construis(): T;
}

class ConstructeurLigneGrist implements ConstructeurDeTest<LigneGrist> {
  _idLigne: number = 0;
  _titreLigne: string = '';

  avecId(id: number): ConstructeurDeTest<LigneGrist> {
    this._idLigne = id;
    return this;
  }

  avecTitre(titre: string): ConstructeurDeTest<LigneGrist> {
    this._titreLigne = titre;
    return this;
  }

  construis(): LigneGrist {
    return { id: this._idLigne, titre: this._titreLigne };
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
          Thematiques: [],
          Type: [],
          Cible: [],
          Parcours_sur_page: [],
          Label_DSC: false,
          Cycle_si_eleves: [],
          Porteur: [],
          Lien: '',
        },
      })),
    };
  }
}

const reponseCyberEnJeux = (): ReponseRessourceCyberGrist => {
  return new ConstructeurReponseRessourceCyberGrist()
    .ajouteUneLigne(
      new ConstructeurLigneGrist()
        .avecId(1)
        .avecTitre('CyberEnJeux')
        .construis()
    )
    .construis();
};

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
      return reponseCyberEnJeux();
    };
    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      ressourcesCyberGrist
    );

    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    expect(ressourcesCyber).toStrictEqual<RessourceCyber[]>([
      {
        id: 1,
        titre: 'CyberEnJeux',
      },
    ]);
  });
});
