import { randomUUID } from 'crypto';
import { Utilisateur } from './utilisateur';
import { Sequence } from './referentiels/sequence';
import { Classe } from './referentiels/classes';
import { Discipline } from './referentiels/disciplines';
import { CategorieDeJeux } from './referentiels/categorieDeJeux';
import { ThematiqueDeJeux } from './referentiels/thematiqueDeJeux';

export type Temoignage = {
  prenom: string;
  details: string;
};

type FichierImage = {
  chemin: string;
};

export type PhotosJeu = {
  couverture: FichierImage;
  photos: FichierImage[];
};

type Reactions = Record<string, number>;

type DonneesConstructionJeu = {
  id?: string;
  nom: string;
  enseignant?: Utilisateur;
  sequence: Sequence;
  nomEtablissement: string;
  classe: Classe;
  discipline: Discipline;
  eleves: string[];
  categorie: CategorieDeJeux;
  thematiques: ThematiqueDeJeux[];
  description: string;
  temoignages?: Temoignage[];
  photos: PhotosJeu;
  consentement?: boolean;
  reactions?: Reactions;
};

export class Jeu {
  readonly id: string;
  nom: string;
  enseignant?: Utilisateur;
  sequence: Sequence;
  nomEtablissement: string;
  classe: Classe;
  discipline: Discipline;
  eleves: string[];
  categorie: CategorieDeJeux;
  thematiques: ThematiqueDeJeux[];
  description: string;
  temoignages: Temoignage[];
  photos: PhotosJeu;
  consentement: boolean;
  reactions: Reactions = {};

  constructor(donnees: DonneesConstructionJeu) {
    this.id = donnees.id ?? randomUUID();
    this.nom = donnees.nom;
    this.enseignant = donnees.enseignant;
    this.sequence = donnees.sequence;
    this.nomEtablissement = donnees.nomEtablissement;
    this.classe = donnees.classe;
    this.discipline = donnees.discipline;
    this.eleves = donnees.eleves;
    this.categorie = donnees.categorie;
    this.thematiques = donnees.thematiques;
    this.description = donnees.description;
    this.temoignages = donnees.temoignages ?? [];
    this.photos = donnees.photos;
    this.consentement = donnees.consentement ?? false;
    this.reactions = donnees.reactions ?? {};
  }

  incrementeReaction() {
    this.reactions['coeur'] += 1;
  }

  decrementeReaction() {
    this.reactions['coeur'] -= 1;
  }
}
