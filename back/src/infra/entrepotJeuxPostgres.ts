import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { Jeu } from '../metier/jeu';
import { randomUUID } from 'crypto';

export class EntrepotJeuxPostgres implements EntrepotJeux {
  knex: Knex.Knex;

  constructor() {
    this.knex = Knex(config);
  }
  async ajoute(jeu: Jeu): Promise<void> {
    jeu.id = randomUUID();
    await this.knex('jeux').insert(jeu);
  }
  async tous(): Promise<Jeu[]> {
    return this.knex('jeux');
  }
}
