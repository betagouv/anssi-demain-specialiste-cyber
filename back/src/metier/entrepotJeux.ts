import { Jeu } from './jeu';
import { Utilisateur } from './utilisateur';

export interface EntrepotJeux {
  ajoute(jeu: Jeu): Promise<void>;
  tous(): Promise<Jeu[]>;
  lesJeuxDe(utilisateur: Utilisateur): Promise<Jeu[]>;
}
