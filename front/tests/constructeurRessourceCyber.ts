import { RessourceCyber } from '../src/ressourceCyber';

interface Constructeur<T> {
  construis(): T;
}

class ConstructeurRessourceCyber implements Constructeur<RessourceCyber> {
  private _publicsCible: string[] = [];
  private _id: number = 1000;
  private _niveaux: string[] = [];
  private _titre: string = 'Un titre';
  private _thematiques: string[] = [];
  private _types: string[] = [];
  private _besoins: string[];

  avecPublicsCible(publicsCible: string[]): ConstructeurRessourceCyber {
    this._publicsCible = publicsCible;
    return this;
  }

  avecThematiques(thematiques: string[]): ConstructeurRessourceCyber {
    this._thematiques = thematiques;
    return this;
  }

  avecNiveaux(niveaux: string[]): ConstructeurRessourceCyber {
    this._niveaux = niveaux;
    return this;
  }

  avecTypes(types: string[]) {
    this._types = types;
    return this;
  }

  avecBesoins(besoins: string[]) {
    this._besoins = besoins;
    return this;
  }

  construis(): RessourceCyber {
    return {
      id: this._id,
      titre: this._titre,
      thematiques: this._thematiques,
      publicsCible: this._publicsCible,
      niveaux: this._niveaux,
      types: this._types,
      besoins: this._besoins,
    };
  }
}

export const unConstructeurDeRessourceCyber = () =>
  new ConstructeurRessourceCyber();
