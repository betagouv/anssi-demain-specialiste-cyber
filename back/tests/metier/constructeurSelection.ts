import { Constructeur } from '../constructeur';
import { Selection } from '../../src/metier/selection';
import { randomUUID } from 'crypto';

class ConstructeurDeSelection implements Constructeur<Selection> {
  private id: string = randomUUID();
  private titre: string = 'Titre';
  private explication: string = 'Explication';
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

  avecUneRessource(idRessource: string): ConstructeurDeSelection {
    this.ressources.push(idRessource);
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
