import { RecupereRessourceHttp } from './recupereRessourceHttp';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';

export type ReponseGrist<TYPE_DOCUMENT> = {
  records: TYPE_DOCUMENT[];
};

type Filtre = Record<string, unknown[]>;

export class EntrepotGrist<TYPE_DOCUMENT> {
  private readonly urlDeBase: string;
  private readonly cleApi: string;

  constructor(
    private readonly ressourcesHTTPGrist: RecupereRessourceHttp<
      ReponseGrist<TYPE_DOCUMENT>
    >,
    private readonly schema: string,
    private readonly table: string,
  ) {
    const grist = adaptateurEnvironnement.grist();
    this.urlDeBase = grist.urlDeBase;
    this.cleApi = grist.cleApi;
  }

  protected async appelleGrist(filtre?: Filtre) {
    const cheminDeBase = `api/docs/${this.schema}/tables/${this.table}/records`;
    const chemin = filtre
      ? `${cheminDeBase}?filter=${encodeURIComponent(JSON.stringify(filtre))}`
      : cheminDeBase;
    const url = new URL(chemin, this.urlDeBase);
    return await this.ressourcesHTTPGrist(url.toString(), {
      headers: {
        authorization: `Bearer ${this.cleApi}`,
        accept: 'application/json',
      },
    });
  }

  protected aseptiseListe<T>(colonne: T[] | null | undefined): T[] {
    return colonne?.slice(1) ?? [];
  }
}
