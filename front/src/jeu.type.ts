export type Temoignage = { prenom: string; details: string };

export type Image = {
  chemin: string;
};

export type PhotosJeu = {
  couverture: Image;
  photos: Image[];
};

export type NoteEvaluation = 1 | 2 | 3 | 4 | 5;

export type Photos = {
  couverture?: Blob;
  photos?: Blob[];
};

export enum NomsDesThematiques {
  'comportements-numeriques' = 'Comportements numériques',
  cyberharcelement = 'Cyberharcèlement',
  'gestion-crise-cyber' = 'Gestion de crise cyber',
  'lutte-manipulation-information' = "Lutte contre la manipulation de l'information",
  'menace-cyber' = 'Menace cyber',
  orientation = 'Orientation',
  'techniques-securite-numerique' = 'Techniques de sécurité numérique',
  'valoriser-talents-feminins' = 'Valoriser les talents féminins',
}
export type Thematique = keyof typeof NomsDesThematiques;

export enum NomDesCategories {
  'jeu-carte' = 'Jeu de cartes',
  'jeu-plateau' = 'Jeu de plateau',
  'jeu-role' = 'Jeu de rôles',
  'jeu-dessin' = 'Jeu de dessin',
  simulation = 'Simulation',
  autre = 'Autre',
}
export type Categorie = keyof typeof NomDesCategories;

export type Niveau =
  | 'Cycle 1 (PS-GS)'
  | 'Cycle 2 (CP-CE2)'
  | 'Cycle 3 (CM1-6e)'
  | 'Cycle 4 (5e-3e)'
  | 'Cycle Terminal (2-T)'
  | 'Post Bac';
