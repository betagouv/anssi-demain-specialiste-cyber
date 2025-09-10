import { Jeu } from './jeu';

export interface EntrepotJeux {
  ajoute(jeu: Jeu): Promise<void>;
  tous(): Promise<Jeu[]>;
}
