export type Jeu = {
  id: string;
  nom: string;
};

export type JeuEnEdition = {
  nom?: string;
  sequence?: string;
  nomEtablissement?: string;
  discipline?: string;
  classe?: string;
  eleves?: string[];
};

export type ErreursValidationJeuEnEdition = Partial<
  Record<keyof JeuEnEdition, string>
>;

export type InformationsGeneralesDuJeu = Pick<
  JeuEnEdition,
  'nomEtablissement' | 'sequence' | 'discipline' | 'classe' | 'eleves'
>;
