import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { Jeu } from '../metier/jeu';

export class EntrepotJeuxPostgres implements EntrepotJeux {
  knex: Knex.Knex;

  constructor() {
    this.knex = Knex(config);
  }
  async ajoute(jeu: Jeu): Promise<void> {
    await this.knex('jeux').insert(jeu);
  }
  async tous(): Promise<Jeu[]> {
    return (await this.knex('jeux')).map(
      (jeuEnDB) => new Jeu({ id: jeuEnDB.id, nom: jeuEnDB.nom }),
    );
  }
}
