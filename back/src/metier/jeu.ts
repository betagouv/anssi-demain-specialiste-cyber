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

export type NoteEvaluation = 1 | 2 | 3 | 4 | 5;

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
  evaluationDecouverte: NoteEvaluation;
  evaluationInteret: NoteEvaluation;
  evaluationSatisfactionGenerale: NoteEvaluation;
  precisions?: string;

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
    evaluationDecouverte,
    evaluationInteret,
    evaluationSatisfactionGenerale,
    precisions,
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
    evaluationDecouverte: NoteEvaluation;
    evaluationInteret: NoteEvaluation;
    evaluationSatisfactionGenerale: NoteEvaluation;
    precisions?: string;
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
    this.evaluationDecouverte = evaluationDecouverte;
    this.evaluationInteret = evaluationInteret;
    this.evaluationSatisfactionGenerale = evaluationSatisfactionGenerale;
    this.precisions = precisions;
  }
}
