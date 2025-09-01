import { Utilisateur } from './utilisateur';

export interface EntrepotUtilisateur {
  ajoute: (utilisateur: Utilisateur) => Promise<void>;
  parEmailHache: (emailHache: string) => Promise<Utilisateur | undefined>;
  existe: (emailHache: string) => Promise<boolean>;
  tous: () => Promise<Utilisateur[]>;
  taille: () => Promise<number>;
}
