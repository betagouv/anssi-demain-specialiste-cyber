import { randomUUID } from 'crypto';
import { Utilisateur } from './utilisateur';
import { Sequence } from './referentiels/sequence';
import { Classe } from './referentiels/classes';
import { Discipline } from './referentiels/disciplines';

export class Jeu {
  readonly id: string;
  nom: string;
  enseignant?: Utilisateur;
  sequence: Sequence;
  nomEtablissement: string;
  classe: Classe;
  discipline: Discipline;

  constructor({
    id,
    nom,
    enseignant,
    sequence,
    nomEtablissement,
    classe,
    discipline,
  }: {
    id?: string;
    nom: string;
    enseignant?: Utilisateur;
    sequence: Sequence;
    nomEtablissement: string;
    classe: Classe;
    discipline: Discipline;
  }) {
    this.id = id ?? randomUUID();
    this.nom = nom;
    this.enseignant = enseignant;
    this.sequence = sequence;
    this.nomEtablissement = nomEtablissement;
    this.classe = classe;
    this.discipline = discipline;
  }
}
