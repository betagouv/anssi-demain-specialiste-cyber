export type Jeu = {
  id: string;
  nom: string;
  eleves: string[];
  nomEtablissement: string;
  sequence: Sequence;
  enseignant: string;
  classe: string;
  discipline: string;
  description: string;
  temoignages: { prenom: string; details: string }[];
  thematiques: string[];
};

type Sequence = 'heure' | 'demi-journee' | 'journee';

export const libelleSequence: Record<Sequence, string> = {
  heure: 'Heure de cours',
  'demi-journee': 'Demi-journée',
  journee: 'Journée',
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

export const enumerationFrancaise = (termes: string[]) => {
  if (termes.length === 0) return '';
  if (termes.length === 1) return termes[0];
  const debut = termes.slice(0, termes.length - 1);
  const dernier = termes[termes.length - 1];
  return debut.join(', ') + ' et ' + dernier;
};
