import { EntrepotSelections } from '../../src/metier/entrepotSelections';
import { Selection } from '../../src/metier/selection';
import { EntrepotMemoire } from './entrepotMemoire';

export class EntrepotSelectionsEnseignantsMemoire
  extends EntrepotMemoire<Selection>
  implements EntrepotSelections {}
