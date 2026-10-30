import { EntrepôtFonctions } from '../metier/entrepotFonctions';
import { Fonction } from '../metier/fonction';

export class EntrepôtFonctionsGrist implements EntrepôtFonctions {
  tous(): Promise<Fonction[]> {
    throw new Error('Method not implemented.');
  }
}
