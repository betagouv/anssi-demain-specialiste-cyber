import { Fonction } from './fonction';
import { Metier } from './metier';
import { RessourceCyber } from './ressourceCyber';

export type Rôle = {
  nom: string;
  description: string;
};

export class FamilleDeMétier {
  numéro: number;
  code: string;
  titre: string;
  sousTitre: string;
  description: string;
  rôles: Rôle[];
  profils: Metier[];
  ressourcesAssociées: RessourceCyber[];
  fonctions: Fonction[];

  constructor(données: {
    numéro: number;
    code: string;
    titre: string;
    sousTitre: string;
    description: string;
    rôles: Rôle[];
    profils?: Metier[];
    ressourcesAssociées?: RessourceCyber[];
    fonctions?: Fonction[];
  }) {
    this.numéro = données.numéro;
    this.code = données.code;
    this.titre = données.titre;
    this.sousTitre = données.sousTitre;
    this.description = données.description;
    this.rôles = données.rôles;
    this.profils = données.profils ?? [];
    this.ressourcesAssociées = données.ressourcesAssociées ?? [];
    this.fonctions = données.fonctions ?? [];
  }
}
