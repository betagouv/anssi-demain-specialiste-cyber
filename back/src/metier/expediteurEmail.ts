export interface ExpediteurEmail {
  creeContact: ({
    email,
    prenom,
    nom,
    infolettreAcceptee,
    pixelDeSuiviAccepté,
  }: {
    email: string;
    prenom: string;
    nom: string;
    infolettreAcceptee: boolean;
    pixelDeSuiviAccepté: boolean;
  }) => Promise<void>;

  envoieEmailBienvenue: ({
    email,
    prenom,
  }: {
    email: string;
    prenom: string;
  }) => Promise<void>;
}
