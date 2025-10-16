import { randomUUID } from 'crypto';

type DonneesConstructionSelection = {
  id?: string;
  titre: string;
  explication: string;
  ressources: string[];
  couleurDeFond: string | undefined;
};

export class Selection {
  readonly id: string;
  titre: string;
  explication: string;
  ressources: string[] = [];
  couleurDeFond: string | undefined;

  constructor(donnees: DonneesConstructionSelection) {
    this.id = donnees.id ?? randomUUID();
    this.titre = donnees.titre;
    this.explication = donnees.explication;
    this.ressources = donnees.ressources;
  }
}
