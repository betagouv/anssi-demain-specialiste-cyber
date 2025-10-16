import { randomUUID } from 'crypto';
import { RessourceCyber } from './ressourceCyber';

type DonneesConstructionSelection = {
  id?: string;
  titre: string;
  explication: string;
  ressources: RessourceCyber[];
  couleurDeFond: string | undefined;
};

export class Selection {
  readonly id: string;
  titre: string;
  explication: string;
  ressources: RessourceCyber[] = [];
  couleurDeFond: string | undefined;

  constructor(donnees: DonneesConstructionSelection) {
    this.id = donnees.id ?? randomUUID();
    this.titre = donnees.titre;
    this.explication = donnees.explication;
    this.ressources = donnees.ressources;
    this.couleurDeFond = donnees.couleurDeFond;
  }
}
