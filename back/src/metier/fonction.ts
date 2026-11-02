export type Témoignage = {
  nom: string;
  femme: boolean;
  lien: string;
};

export type Fonction = {
  id: number;
  nom: string;
  famille: string;
  missionPrincipale: string;
  lien: string;
  témoignage: Témoignage;
};
