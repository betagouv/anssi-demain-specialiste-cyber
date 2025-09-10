import { EntrepotJeux } from '../metier/entrepotJeux';
import { Jeu } from '../metier/jeu';

export class EntrepotJeuxPostgres implements EntrepotJeux {
  ajoute(_jeu: Jeu): Promise<void> {
    throw new Error('Method not implemented.');
  }
  tous(): Promise<Jeu[]> {
    throw new Error('Method not implemented.');
  }
}
