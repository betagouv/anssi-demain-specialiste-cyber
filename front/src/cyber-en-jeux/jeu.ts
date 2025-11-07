import type { Categorie, Niveau, PhotosJeu, Thematique } from '../jeu.type';

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
  estCache: boolean;
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
      estCache: false,
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
