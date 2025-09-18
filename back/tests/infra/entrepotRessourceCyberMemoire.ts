import { EntrepotRessourcesCyber } from '../../src/metier/entrepotRessourcesCyber';
import { type RessourceCyber } from '../../src/metier/ressourceCyber';
import { EntrepotMemoire } from './entrepotMemoire';

export class EntrepotRessourcesCyberMemoire
  extends EntrepotMemoire<RessourceCyber>
  implements EntrepotRessourcesCyber {}
