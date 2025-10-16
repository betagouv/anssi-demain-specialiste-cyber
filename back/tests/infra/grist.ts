import { ConstructeurDeTest } from './constructeurDeTest';

type Valeur = boolean | string | number | (string | number)[];

export interface LigneGrist {
  id: number;
  fields: Record<string, Valeur>;
}

export interface TableauGrist<LIGNE> {
  records: LIGNE[];
}

export class ConstructeurLigneGrist<LIGNE extends LigneGrist>
  implements ConstructeurDeTest<LIGNE>
{
  _idLigne: number = 0;
  _fields: { [key: string]: Valeur } = {};

  avecId(id: number): this {
    this._idLigne = id;
    return this;
  }

  avecColonneEtValeur(
    colonne: string,
    valeur: boolean | string | number,
  ): ConstructeurLigneGrist<LIGNE> {
    this._fields[colonne] = valeur;
    return this;
  }

  avecColonneEtListeDeValeurs(
    colonne: string,
    valeur: (string | number)[],
  ): ConstructeurLigneGrist<LIGNE> {
    this._fields[colonne] = ['L', ...valeur];
    return this;
  }

  construis(): LIGNE {
    return {
      id: this._idLigne,
      fields: this._fields,
    } as LIGNE;
  }
}
