import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { Jeu } from '../../src/metier/jeu';
import { EntrepotMemoire } from './entrepotMemoire';

export class EntrepotJeuxMemoire
  extends EntrepotMemoire<Jeu>
  implements EntrepotJeux {}
