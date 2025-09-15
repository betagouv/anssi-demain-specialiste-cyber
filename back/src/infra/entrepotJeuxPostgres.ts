import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { Jeu } from '../metier/jeu';
import { AdaptateurHachage } from './adaptateurHachage';

export class EntrepotJeuxPostgres implements EntrepotJeux {
  knex: Knex.Knex;
  private adaptateurHachage: AdaptateurHachage;

  constructor({ adaptateurHachage }: { adaptateurHachage: AdaptateurHachage }) {
    this.adaptateurHachage = adaptateurHachage;
    this.knex = Knex(config);
  }
  async ajoute(jeu: Jeu): Promise<void> {
    await this.knex('jeux').insert({
      id: jeu.id,
      nom: jeu.nom,
      id_enseignant: jeu.enseignant
        ? this.adaptateurHachage.hache(jeu.enseignant.email)
        : null,
    });
  }
  async tous(): Promise<Jeu[]> {
    return (await this.knex('jeux')).map(
      (jeuEnDB) => new Jeu({ id: jeuEnDB.id, nom: jeuEnDB.nom }),
    );
  }
}
