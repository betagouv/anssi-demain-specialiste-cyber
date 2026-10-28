import { Metier } from './metier';
import { RessourceCyber } from './ressourceCyber';

export type Rôle = {
  nom: string;
  description: string;
};

export class FamilleDeMétier {
  code: string;
  titre: string;
  sousTitre: string;
  description: string;
  rôles: Rôle[];
  profils: Metier[];
  ressourcesAssociées: RessourceCyber[];

  constructor(données: {
    code: string;
    titre: string;
    sousTitre: string;
    description: string;
    rôles: Rôle[];
    profils?: Metier[];
    ressourcesAssociées?: RessourceCyber[];
  }) {
    this.code = données.code;
    this.titre = données.titre;
    this.sousTitre = données.sousTitre;
    this.description = données.description;
    this.rôles = données.rôles;
    this.profils = données.profils ?? [];
    this.ressourcesAssociées = données.ressourcesAssociées ?? [];
  }
}
