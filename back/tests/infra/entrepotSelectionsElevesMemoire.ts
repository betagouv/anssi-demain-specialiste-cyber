import { EntrepotMemoire } from './entrepotMemoire';
import { Selection } from '../../src/metier/selection';

import { EntrepotSelectionsEleves } from '../../src/metier/entrepotSelectionsEleves';

export class EntrepotSelectionsElevesMemoire
  extends EntrepotMemoire<Selection>
  implements EntrepotSelectionsEleves {}
