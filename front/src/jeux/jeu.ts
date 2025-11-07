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

export const enumerationFrancaise = (termes: string[]) => {
  if (termes.length === 0) return '';
  if (termes.length === 1) return termes[0];
  const debut = termes.slice(0, termes.length - 1);
  const dernier = termes[termes.length - 1];
  return debut.join(', ') + ' et ' + dernier;
};
