import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { EntrepotMemoire } from './entrepotMemoire';

export class EntrepotJeuxMemoire
  extends EntrepotMemoire<unknown>
  implements EntrepotJeux {}
