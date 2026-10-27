import { FamilleDeMétier } from './familleDeMetier';

export interface EntrepôtFamillesDeMétier {
  tous(): Promise<FamilleDeMétier[]>;
}
