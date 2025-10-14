import { Metier } from './metier';

export interface EntrepotMetiers {
  parIdentifiant: (identifiant: number) => Promise<Metier | undefined>;
  ajoute: (metier: Metier) => Promise<void>;
}
