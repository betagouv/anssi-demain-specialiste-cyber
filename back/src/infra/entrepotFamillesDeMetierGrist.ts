import { EntrepôtFamillesDeMétier } from '../metier/entrepotFamillesDeMetier';
import { FamilleDeMétier } from '../metier/familleDeMetier';

export class EntrepôtFamillesDeMétierGrist implements EntrepôtFamillesDeMétier {
  tous(): Promise<FamilleDeMétier[]> {
    throw new Error('Method not implemented.');
  }
}
