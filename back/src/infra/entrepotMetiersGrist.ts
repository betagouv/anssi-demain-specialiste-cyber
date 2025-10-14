import { EntrepotMetiers } from '../metier/entrepotMetiers';
import { Metier } from '../metier/metier';

export class EntrepotMetiersGrist implements EntrepotMetiers {
  parIdentifiant(_identifiant: number): Promise<Metier> {
    throw new Error('Metier not implemented');
  }
  async ajoute(_metier: Metier): Promise<void> {
    throw new Error('Pas supporté');
  }
}
