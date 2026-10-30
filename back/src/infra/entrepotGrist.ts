import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { Cache } from './cache';
import { RecupereRessourceHttp } from './clientHttp';

export type ReponseGrist<TYPE_DOCUMENT> = {
  records: TYPE_DOCUMENT[];
};

type Filtre = Record<string, unknown[]>;

const CINQ_MINUTES = 5;

export class EntrepotGrist<TYPE_DOCUMENT> {
  private readonly urlDeBase: string;
  private readonly cleApi: string;
  private cache: Cache<ReponseGrist<TYPE_DOCUMENT>>;

  constructor(
    private readonly ressourcesHTTPGrist: RecupereRessourceHttp<
      ReponseGrist<TYPE_DOCUMENT>
    >,
    protected readonly schema: string,
    protected readonly table: string,
  ) {
    const grist = adaptateurEnvironnement.grist();
    this.urlDeBase = grist.urlDeBase;
    this.cleApi = grist.cleApi;
    this.cache = new Cache({ ttl: CINQ_MINUTES });
  }

  protected async appelleGrist(filtre?: Filtre) {
    const cheminDeBase = this.cheminDeBase();
    const chemin = filtre
      ? `${cheminDeBase}?filter=${encodeURIComponent(JSON.stringify(filtre))}`
      : cheminDeBase;
    const url = new URL(chemin, this.urlDeBase);
    return await this.cache.get(chemin, () =>
      this.ressourcesHTTPGrist(url.toString(), {
        headers: {
          authorization: `Bearer ${this.cleApi}`,
          accept: 'application/json',
        },
      }),
    );
  }

  protected cheminDeBase = () =>
    `api/docs/${this.schema}/tables/${this.table}/records`;

  protected aseptiseListe<T>(colonne: T[] | null | undefined): T[] {
    return colonne?.slice(1) ?? [];
  }
}
