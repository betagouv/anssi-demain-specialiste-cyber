import type { NoteEvaluation, Jeu } from '../jeu.type';

export type Photos = {
  couverture?: Blob;
  photos?: Blob[];
};

export type JeuEnEdition = Partial<Omit<Jeu, 'photos'>> & {
  categorie?: string;
  evaluationDecouverte?: NoteEvaluation;
  evaluationInteret?: NoteEvaluation;
  evaluationSatisfactionGenerale?: NoteEvaluation;
  precisions?: string;
  photos?: Photos;
  consentement?: boolean;
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

export type PhotosDuJeu = Pick<JeuEnEdition, 'photos'>;
