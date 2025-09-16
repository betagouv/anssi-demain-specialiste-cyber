import { randomUUID } from 'crypto';
import { Utilisateur } from './utilisateur';
import { Sequence } from './sequence';

export class Jeu {
  readonly id: string;
  nom: string;
  enseignant?: Utilisateur;
  sequence: Sequence;

  constructor({
    id,
    nom,
    enseignant,
    sequence
  }: {
    id?: string;
    nom: string;
    enseignant?: Utilisateur;
    sequence: Sequence;
  }) {
    this.id = id ?? randomUUID();
    this.nom = nom;
    this.enseignant = enseignant;
    this.sequence = sequence;
  }
}
