import { EntrepotSelectionEnseignants } from '../../src/metier/entrepotSelectionEnseignants';
import { Selection } from '../../src/metier/selection';
import { EntrepotMemoire } from './entrepotMemoire';

export class EntrepotSelectionEnseignantsMemoire
  extends EntrepotMemoire<Selection>
  implements EntrepotSelectionEnseignants {}
