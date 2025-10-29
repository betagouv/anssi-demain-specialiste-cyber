export interface ExpediteurEmail {
  creeContact: ({
    email,
    prenom,
    nom,
    infolettreAcceptee,
  }: {
    email: string;
    prenom: string;
    nom: string;
    infolettreAcceptee: boolean;
  }) => Promise<void>;
}
