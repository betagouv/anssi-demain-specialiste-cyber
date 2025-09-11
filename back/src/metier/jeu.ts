import { randomUUID } from 'crypto';

export class Jeu {
  readonly id: string;
  nom: string;

  constructor({ id, nom }: { id?: string; nom: string }) {
    this.id = id ?? randomUUID();
    this.nom = nom;
  }
}
