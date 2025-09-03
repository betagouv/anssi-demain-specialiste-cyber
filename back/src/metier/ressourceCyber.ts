export type RessourceCyber = {
  id: number;
  niveaux: Niveaux;
  selections: Selections;
  thematiques: Thematiques;
  titre: string;
};

type Niveaux = string[];
type Selections = string[];
type Thematiques = string[];
