interface InformationsCreationUtilisateur {
  email: string;
  prenom: string;
  nom: string;
  siretEntite: string;
  infolettreAcceptee: boolean;
}

export class Utilisateur {
  email: string;
  prenom: string;
  nom: string;
  infolettreAcceptee: boolean;
  siretEntite: string;

  constructor({
    email,
    prenom,
    nom,
    infolettreAcceptee,
    siretEntite,
  }: InformationsCreationUtilisateur) {
    this.email = email;
    this.prenom = prenom;
    this.nom = nom;
    this.infolettreAcceptee = infolettreAcceptee;
    this.siretEntite = siretEntite;
  }
}
