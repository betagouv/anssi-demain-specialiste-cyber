import type { PhotosJeu, Temoignage, Thematique } from '../jeu.type';

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
