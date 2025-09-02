import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import {
  creeRecupereRessourceHttp,
  RecupereRessourceHttp,
} from './recupereRessourceHttp';
import { RessourceCyber } from '../metier/ressourceCyber';

export type ReponseRessourceCyberGrist = {
  records: {
    id: number;
    fields: {
      A: string;
      Titre: string;
      Description: string;
      Besoins: string[];
      Thematiques: string[];
      Type: string[];
      Cible: string[];
      Parcours_sur_page: string[];
      Label_DSC: boolean;
      Cycle_si_eleves: string[];
      Porteur: string[];
      Lien: string;
    };
  }[];
};

export class EntrepotRessourcesCyberGrist implements EntrepotRessourcesCyber {
  private urlDeBase: string;
  private cleApi: string;
  private schema: string;
  private table: string;

  constructor(
    private ressourcesCyberGrist: RecupereRessourceHttp<ReponseRessourceCyberGrist> = creeRecupereRessourceHttp()
  ) {
    const grist = adaptateurEnvironnement.grist();
    this.urlDeBase = grist.urlDeBase;
    this.cleApi = grist.cleApi;
    this.schema = grist.ressourcesCyber().idDocument;
    this.table = grist.ressourcesCyber().idTable;
  }

  async tous(): Promise<RessourceCyber[]> {
    const url = new URL(
      `api/docs/${this.schema}/tables/${this.table}/records`,
      this.urlDeBase
    );
    const reponse = await this.ressourcesCyberGrist(url.toString(), {
      headers: {
        authorization: `Bearer ${this.cleApi}`,
        accept: 'application/json',
      },
    });
    return reponse.records.map((record) => ({
      id: record.id,
      titre: record.fields.Titre,
      thematiques: record.fields.Thematiques.slice(1),
      selections: record.fields.Cible.slice(1),
    }));
  }
}
