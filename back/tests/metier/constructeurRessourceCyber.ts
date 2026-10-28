import { RessourceCyber } from '../../src/metier/ressourceCyber';
import { Constructeur } from '../constructeur';

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

  avecId(id: number) {
    this._id = id;
    return this;
  }

  avecTitre(titre: string) {
    this._titre = titre;
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
      lienExterne: this._lien,
    };
  }
}

export const uneRessourceCyber = () => new ConstructeurRessourceCyber();
