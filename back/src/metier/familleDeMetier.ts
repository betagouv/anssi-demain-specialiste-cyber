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

  constructor(données: {
    code: string;
    titre: string;
    sousTitre: string;
    description: string;
    rôles: Rôle[];
  }) {
    this.code = données.code;
    this.titre = données.titre;
    this.sousTitre = données.sousTitre;
    this.description = données.description;
    this.rôles = données.rôles;
  }
}
