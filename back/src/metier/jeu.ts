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

  constructor({
    id,
    nom,
    enseignant,
    sequence,
    nomEtablissement,
    classe,
    discipline,
    eleves,
    categorie,
    thematiques,
    description,
    temoignages = [],
    photos,
    consentement = false,
  }: {
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
  }) {
    this.id = id ?? randomUUID();
    this.nom = nom;
    this.enseignant = enseignant;
    this.sequence = sequence;
    this.nomEtablissement = nomEtablissement;
    this.classe = classe;
    this.discipline = discipline;
    this.eleves = eleves;
    this.categorie = categorie;
    this.thematiques = thematiques;
    this.description = description;
    this.temoignages = temoignages;
    this.photos = photos;
    this.consentement = consentement;
  }
}
