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
