interface InformationsCreationUtilisateur {
  email: string;
  prenom: string;
  nom: string;
  siretEntite: string;
  cguAcceptees: boolean;
  infolettreAcceptee: boolean;
}

export class Utilisateur {
  email: string;
  prenom: string;
  nom: string;
  cguAcceptees: boolean;
  infolettreAcceptee: boolean;
  siretEntite: string;

  constructor({
    email,
    prenom,
    nom,
    cguAcceptees,
    infolettreAcceptee,
    siretEntite,
  }: InformationsCreationUtilisateur) {
    this.email = email;
    this.prenom = prenom;
    this.nom = nom;
    this.cguAcceptees = cguAcceptees;
    this.infolettreAcceptee = infolettreAcceptee;
    this.siretEntite = siretEntite;
  }
}
