import type {
  NoteEvaluation,
  Photos,
  PhotosJeu,
  Temoignage,
  Thematique,
} from '../jeu.type';

export type Jeu = {
  id: string;
  nom: string;
  eleves: string[];
  nomEtablissement: string;
  sequence: string;
  enseignant: string;
  classe: string;
  discipline: string;
  description: string;
  temoignages: Temoignage[];
  thematiques: Thematique[];
  photos: PhotosJeu;
  reactions: Record<string, number>;
  estCache: boolean;
  estProprietaire: boolean;
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
  temoignages?: Temoignage[];
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

export const enumerationFrancaise = (termes: string[]) => {
  if (termes.length === 0) return '';
  if (termes.length === 1) return termes[0];
  const debut = termes.slice(0, termes.length - 1);
  const dernier = termes[termes.length - 1];
  return debut.join(', ') + ' et ' + dernier;
};
