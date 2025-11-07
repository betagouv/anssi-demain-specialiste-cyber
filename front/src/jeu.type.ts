export type Temoignage = { prenom: string; details: string };

export type Image = {
  chemin: string;
};

export type PhotosJeu = {
  couverture: Image;
  photos: Image[];
};

export type NoteEvaluation = 1 | 2 | 3 | 4 | 5;

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

export type DonneesJeu = {
  id: string;
  categorie: string;
  classe?: string;
  description: string;
  discipline?: string;
  eleves: string[];
  enseignant?: string;
  estCache?: boolean;
  estProprietaire?: boolean;
  niveau: string;
  nom: string;
  nomEtablissement: string;
  photos: PhotosJeu;
  reactions: Record<string, number>;
  sequence?: string;
  temoignages?: Temoignage[];
  thematiques: string[];
};

export type Jeu = {
  id: string;
  categorie: Categorie;
  classe: string;
  description: string;
  discipline: string;
  eleves: string[];
  enseignant: string;
  estCache: boolean;
  estProprietaire: boolean;
  niveau: Niveau;
  nom: string;
  nomEtablissement: string;
  photos: PhotosJeu;
  reactions: Record<string, number>;
  sequence: string;
  temoignages: Temoignage[];
  thematiques: Thematique[];
};

export const construisJeu = (item: DonneesJeu): Jeu => ({
  ...item,
  niveau: item.niveau as Niveau,
  categorie: item.categorie as Categorie,
  thematiques: item.thematiques?.map((t) => t as Thematique) ?? [],
  estCache: item.estCache ?? false,
  enseignant: item.enseignant ?? '',
  discipline: item.discipline ?? '',
  estProprietaire: item.estProprietaire ?? false,
  sequence: item.sequence ?? '',
  temoignages: item.temoignages ?? [],
  classe: item.classe ?? '',
});

export const construisLesJeux = (data: DonneesJeu[]): Jeu[] => {
  return data
    .map(construisJeu)
    .sort((jeu1, jeu2) => jeu1.nom.localeCompare(jeu2.nom));
};

export const enumerationFrancaise = (termes: string[]) => {
  if (termes.length === 0) return '';
  if (termes.length === 1) return termes[0];
  const debut = termes.slice(0, termes.length - 1);
  const dernier = termes[termes.length - 1];
  return debut.join(', ') + ' et ' + dernier;
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
