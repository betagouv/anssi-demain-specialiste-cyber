import { RecupereRessourceHttp } from './recupereRessourceHttp';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';

export type ReponseGrist<TYPE_DOCUMENT> = {
  records: TYPE_DOCUMENT[];
};

export class EntrepotGrist<TYPE_DOCUMENT> {
  private readonly urlDeBase: string;
  private readonly cleApi: string;

  constructor(
    private readonly ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseGrist<TYPE_DOCUMENT>
    >,
    private readonly schema: string,
    private readonly table: string,
  ) {
    const grist = adaptateurEnvironnement.grist();
    this.urlDeBase = grist.urlDeBase;
    this.cleApi = grist.cleApi;
  }

  protected async appelleGrist() {
    const url = new URL(
      `api/docs/${this.schema}/tables/${this.table}/records`,
      this.urlDeBase,
    );
    return await this.ressourcesCyberGrist(url.toString(), {
      headers: {
        authorization: `Bearer ${this.cleApi}`,
        accept: 'application/json',
      },
    });
  }
}
