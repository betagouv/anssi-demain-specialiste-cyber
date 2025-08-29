import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { Utilisateur } from '../metier/utilisateur';

export class EntrepotUtilisateurPostgres implements EntrepotUtilisateur {
  async ajoute(_utilisateur: Utilisateur) {
    {
      throw new Error();
    }
  }
  async parEmailHache(_emailHache: string): Promise<Utilisateur | undefined> {
    throw new Error();
  }
  async existe(_emailHache: string): Promise<boolean> {
    throw new Error();
  }
  async tous(): Promise<Utilisateur[]> {
    throw new Error();
  }
  async taille(): Promise<number> {
    throw new Error();
  }
}
