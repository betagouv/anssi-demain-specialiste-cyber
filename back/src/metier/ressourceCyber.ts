export type RessourceCyber = {
  urlIllustration: string;
  description: string;
  besoins: Besoins;
  id: number;
  niveaux: Niveaux;
  publicsCible: PublicsCible;
  thematiques: Thematiques;
  types: Types;
  titre: string;
  estCertifiee: boolean;
  lienExterne: string;
};

type Niveaux = string[];
type PublicsCible = string[];
type Thematiques = string[];
type Types = string[];
type Besoins = string[];
