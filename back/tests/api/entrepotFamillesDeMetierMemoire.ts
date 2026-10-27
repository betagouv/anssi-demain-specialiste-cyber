import { EntrepôtFamillesDeMétier } from '../../src/metier/entrepotFamillesDeMetier';
import { FamilleDeMétier } from '../../src/metier/familleDeMetier';
import { EntrepotMemoire } from '../infra/entrepotMemoire';

export class EntrepôtFamillesDeMétierMémoire
  extends EntrepotMemoire<FamilleDeMétier>
  implements EntrepôtFamillesDeMétier {}
