import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { LectureHttp } from './lectureHttp';

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

  constructor(private clientHttp: LectureHttp<ReponseRessourceCyberGrist>) {
    const grist = adaptateurEnvironnement.grist();
    this.urlDeBase = grist.urlDeBase;
    this.cleApi = grist.cleApi;
    this.schema = grist.ressourcesCyber().idDocument;
    this.table = grist.ressourcesCyber().idTable;
  }

  async tous() {
    const url = new URL(
      `/v1/${this.schema}/tables/${this.table}/records`,
      this.urlDeBase
    );
    const reponse = await this.clientHttp.get(url.toString(), {
      headers: { Authorization: `Bearer ${this.cleApi}` },
    });
    return reponse.records.map((record) => ({
      id: record.id,
      titre: record.fields.Titre,
    }));
  }
}
