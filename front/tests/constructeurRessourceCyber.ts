import { RessourceCyber } from '../src/ressourceCyber';

interface Constructeur<T> {
  construis(): T;
}

class ConstructeurRessourceCyber implements Constructeur<RessourceCyber> {
  private _selections: string[] = [];
  private _id: number = 1000;
  private _niveaux: string[] = [];
  private _titre: string = 'Un titre';
  private _thematiques: string[] = [];

  avecSelections(selections: string[]): ConstructeurRessourceCyber {
    this._selections = selections;
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

  construis(): RessourceCyber {
    return {
      id: this._id,
      titre: this._titre,
      thematiques: this._thematiques,
      selections: this._selections,
      niveaux: this._niveaux,
    };
  }
}

export const unConstructeurDeRessourceCyber = () =>
  new ConstructeurRessourceCyber();
