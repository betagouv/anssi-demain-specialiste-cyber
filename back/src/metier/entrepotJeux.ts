export interface EntrepotJeux {
  ajoute(jeu: unknown): Promise<void>;
  tous(): Promise<unknown[]>;
}
