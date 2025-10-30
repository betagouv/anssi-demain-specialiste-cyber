import type { PhotosJeu } from '../jeux/jeu';

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

export type Jeu = {
  id: string;
  nom: string;
  description: string;
  niveau: Niveau;
  categorie: Categorie;
  thematiques: Thematique[];
  nomEtablissement: string;
  eleves: string[];
  reactions: Record<string, number>;
  photos: PhotosJeu;
};

export type DonneesJeu = {
  id: string;
  nom: string;
  description: string;
  niveau: string;
  categorie: string;
  thematiques: string[];
  nomEtablissement: string;
  eleves: string[];
  reactions: Record<string, number>;
  photos: PhotosJeu;
};

export const construisLesJeux = (data: DonneesJeu[]): Jeu[] => {
  return data
    .map((item) => ({
      ...item,
      niveau: item.niveau as Niveau,
      categorie: item.categorie as Categorie,
      thematiques: item.thematiques?.map((t) => t as Thematique) ?? [],
    }))
    .sort((jeu1, jeu2) => jeu1.nom.localeCompare(jeu2.nom));
};

export const lesThematiques = (jeu: Jeu[]): Thematique[] => {
  return Array.from(new Set(jeu.flatMap((r) => r.thematiques))).sort();
};

export const lesCategories = (jeu: Jeu[]): Categorie[] => {
  return Array.from(new Set(jeu.flatMap((r) => r.categorie))).sort((s1, s2) =>
    s1.localeCompare(s2),
  );
};

export const lesNiveaux = (jeu: Jeu[]): Niveau[] => {
  return Array.from(new Set(jeu.flatMap((r) => r.niveau))).sort((n1, n2) =>
    n1.localeCompare(n2),
  );
};
