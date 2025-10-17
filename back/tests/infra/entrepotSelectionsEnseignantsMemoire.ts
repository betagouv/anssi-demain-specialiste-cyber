import { EntrepotSelectionsEnseignants } from '../../src/metier/entrepotSelectionsEnseignants';
import { Selection } from '../../src/metier/selection';
import { EntrepotMemoire } from './entrepotMemoire';

export class EntrepotSelectionsEnseignantsMemoire
  extends EntrepotMemoire<Selection>
  implements EntrepotSelectionsEnseignants {}
