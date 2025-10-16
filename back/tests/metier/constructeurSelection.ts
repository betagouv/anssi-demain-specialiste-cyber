import { Constructeur } from '../constructeur';
import { Selection } from '../../src/metier/selection';

class ConstructeurDeSelection implements Constructeur<Selection> {
  private id: string = '';
  private titre: string = '';
  private explication: string = '';
  private ressources: string[] = [];

  avecUnId(identifiant: string): ConstructeurDeSelection {
    this.id = identifiant;
    return this;
  }

  avecUnTitre(titre: string): ConstructeurDeSelection {
    this.titre = titre;
    return this;
  }

  avecUneExplication(explication: string): ConstructeurDeSelection {
    this.explication = explication;
    return this;
  }

  construis(): Selection {
    return new Selection({
      id: this.id,
      titre: this.titre,
      explication: this.explication,
      ressources: this.ressources,
      couleurDeFond: undefined,
    });
  }
}

export const uneSelection = () => new ConstructeurDeSelection();
