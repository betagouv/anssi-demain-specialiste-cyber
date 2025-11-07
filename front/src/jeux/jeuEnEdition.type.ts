import type { Jeu, NoteEvaluation } from '../jeu.type';

export type Photos = {
  couverture?: Blob;
  photos?: Blob[];
};

export type JeuEnEdition = Partial<
  Pick<
    Jeu,
    | 'categorie'
    | 'classe'
    | 'description'
    | 'discipline'
    | 'eleves'
    | 'estCache'
    | 'id'
    | 'nom'
    | 'nomEtablissement'
    | 'sequence'
    | 'temoignages'
    | 'thematiques'
  >
> & {
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

export const construisJeuEnEditionDepuisJeu = (jeu: Jeu): JeuEnEdition => ({
  categorie: jeu.categorie,
  classe: jeu.classe,
  description: jeu.description,
  discipline: jeu.discipline,
  eleves: jeu.eleves,
  estCache: jeu.estCache,
  id: jeu.id,
  nom: jeu.nom,
  nomEtablissement: jeu.nomEtablissement,
  sequence: jeu.sequence,
  temoignages: jeu.temoignages,
  thematiques: jeu.thematiques,
  photos: undefined,
});
