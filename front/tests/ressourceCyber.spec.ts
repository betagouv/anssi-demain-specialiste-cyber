import { describe, expect, it } from 'vitest';
import {
  lesSelectionsDesRessourcesCyber,
  lesThematiquesCyber,
  RessourceCyber,
} from '../src/ressourceCyber';

describe('Les ressources Cyber', () => {
  it('sort la liste des thématiques', () => {
    const thematiques = lesThematiquesCyber([
      new ConstructeurRessourceCyber()
        .avecThematiques(['Réseau', 'Sécurité'])
        .construis(),
      new ConstructeurRessourceCyber()
        .avecThematiques(['Cryptographie'])
        .construis(),
      new ConstructeurRessourceCyber()
        .avecThematiques(['Réseau', 'Cryptographie'])
        .construis(),
    ]);

    expect(thematiques).toStrictEqual(['Cryptographie', 'Réseau', 'Sécurité']);
  });

  it('sort la liste des sélections', () => {
    const selections = lesSelectionsDesRessourcesCyber([
      new ConstructeurRessourceCyber()
        .avecSelections(['Parents', 'Enseignants'])
        .construis(),
      new ConstructeurRessourceCyber()
        .avecSelections(['Enseignants', 'Élèves'])
        .construis(),
      new ConstructeurRessourceCyber()
        .avecSelections(['Parents', 'Élèves'])
        .construis(),
    ]);

    expect(selections).toStrictEqual(['Élèves', 'Enseignants', 'Parents']);
  });
});

interface Constructeur<T> {
  construis(): T;
}

class ConstructeurRessourceCyber implements Constructeur<RessourceCyber> {
  private _selections: string[] = [];
  private _id: number = 1000;
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

  construis(): RessourceCyber {
    return {
      id: this._id,
      titre: this._titre,
      thematiques: this._thematiques,
      selections: this._selections,
    };
  }
}
