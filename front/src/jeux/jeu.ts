export type Jeu = {
  id: string;
  nom: string;
};

export type JeuEnEdition = {
  sequence?: string;
  nomEtablissement?: string;
  discipline?: string;
  classe?: string;
  eleves?: string[];
  nom?: string;
  categorie?: string;
  thematiques?: string[];
  description?: string;
};

export type ErreursValidationJeuEnEdition = Partial<
  Record<keyof JeuEnEdition, string>
>;

export type InformationsGeneralesDuJeu = Pick<
  JeuEnEdition,
  'nomEtablissement' | 'sequence' | 'discipline' | 'classe' | 'eleves'
>;

export type PresentationDuJeu = Pick<
  JeuEnEdition,
  'nom' | 'categorie' | 'thematiques' | 'description'
>;
