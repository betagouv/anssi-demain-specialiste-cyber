import { EntrepôtFonctions } from '../../src/metier/entrepotFonctions';
import { Fonction } from '../../src/metier/fonction';
import { EntrepotMemoire } from '../infra/entrepotMemoire';

export class EntrepôtFonctionsMémoire
  extends EntrepotMemoire<Fonction>
  implements EntrepôtFonctions {}
