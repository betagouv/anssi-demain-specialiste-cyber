interface InformationsCreationUtilisateur {
  email: string;
  prenom: string;
  nom: string;
  siretEntite: string;
  infolettreAcceptee: boolean;
  pixelDeSuiviAccepté: boolean;
}

export class Utilisateur {
  email: string;
  prenom: string;
  nom: string;
  infolettreAcceptee: boolean;
  siretEntite: string;
  pixelDeSuiviAccepté: boolean;

  constructor({
    email,
    prenom,
    nom,
    infolettreAcceptee,
    siretEntite,
    pixelDeSuiviAccepté,
  }: InformationsCreationUtilisateur) {
    this.email = email;
    this.prenom = prenom;
    this.nom = nom;
    this.infolettreAcceptee = infolettreAcceptee;
    this.siretEntite = siretEntite;
    this.pixelDeSuiviAccepté = pixelDeSuiviAccepté;
  }
}
