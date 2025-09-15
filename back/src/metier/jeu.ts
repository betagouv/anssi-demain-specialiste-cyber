import { randomUUID } from 'crypto';
import { Utilisateur } from './utilisateur';

export class Jeu {
  readonly id: string;
  nom: string;
  enseignant?: Utilisateur;

  constructor({
    id,
    nom,
    enseignant,
  }: {
    id?: string;
    nom: string;
    enseignant?: Utilisateur;
  }) {
    this.id = id ?? randomUUID();
    this.nom = nom;
    this.enseignant = enseignant;
  }
}
