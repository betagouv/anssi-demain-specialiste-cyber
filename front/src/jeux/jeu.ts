export type Jeu = {
  id: string;
  nom: string;
};

export type NoteEvaluation = 1 | 2 | 3 | 4 | 5;

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
  temoignages?: { prenom: string; details: string }[];
  evaluationDecouverte?: NoteEvaluation;
  evaluationInteret?: NoteEvaluation;
  evaluationSatisfactionGenerale?: NoteEvaluation;
  precisions?: string;
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

export type EvaluationDuJeu = Pick<
  JeuEnEdition,
  | 'evaluationDecouverte'
  | 'evaluationInteret'
  | 'evaluationSatisfactionGenerale'
  | 'precisions'
>;
