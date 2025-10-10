import { type RessourceCyber } from '../../src/catalogue/ressourceCyber';

interface Constructeur<T> {
  construis(): T;
}

class ConstructeurRessourceCyber implements Constructeur<RessourceCyber> {
  private _publicsCible: string[] = [];
  private _id: number = 1000;
  private _niveaux: string[] = [];
  private _titre: string = 'Un titre';
  private _description: string = '';
  private _thematiques: string[] = [];
  private _types: string[] = [];
  private _besoins: string[] = [];
  private _urlIllustration: string = 'http://monillu.png';
  private _estCertifiee: boolean = false;
  private _lien: string = '';

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

  avecTitre(titre: string): ConstructeurRessourceCyber {
    this._titre = titre;
    return this;
  }

  avecDescription(description: string): ConstructeurRessourceCyber {
    this._description = description;
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

  estCertifiee(certifiee: boolean) {
    this._estCertifiee = certifiee;
    return this;
  }

  construis(): RessourceCyber {
    return {
      id: this._id,
      titre: this._titre,
      description: this._description,
      thematiques: this._thematiques,
      publicsCible: this._publicsCible,
      niveaux: this._niveaux,
      types: this._types,
      besoins: this._besoins,
      urlIllustration: this._urlIllustration,
      estCertifiee: this._estCertifiee,
      lienExterne: this._lien
    };
  }
}

export const unConstructeurDeRessourceCyber = () =>
  new ConstructeurRessourceCyber();
