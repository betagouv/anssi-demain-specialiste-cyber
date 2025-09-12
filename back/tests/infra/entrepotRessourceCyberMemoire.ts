import { EntrepotRessourcesCyber } from '../../src/metier/entrepotRessourcesCyber';
import { RessourceCyber } from '../../src/metier/ressourceCyber';

export class EntrepotRessourcesCyberMemoire implements EntrepotRessourcesCyber {
  _entites: RessourceCyber[] = [];

  async ajoute(ressourceCyber: RessourceCyber) {
    this._entites.push(ressourceCyber);
  }

  async tous() {
    return this._entites;
  }
}

export const entrepotRessourcesCyberMemoire: EntrepotRessourcesCyberMemoire =
  new EntrepotRessourcesCyberMemoire();
