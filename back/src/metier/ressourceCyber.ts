export type RessourceCyber = {
  besoins: Besoins;
  id: number;
  niveaux: Niveaux;
  selections: Selections;
  thematiques: Thematiques;
  types: Types;
  titre: string;
};

type Niveaux = string[];

type Selections = string[];
type Thematiques = string[];
type Types = string[];
type Besoins = string[];
