import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { Jeu } from '../metier/jeu';
import { AdaptateurHachage } from './adaptateurHachage';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';

export class EntrepotJeuxPostgres implements EntrepotJeux {
  knex: Knex.Knex;
  private adaptateurHachage: AdaptateurHachage;
  private entrepotUtilisateur: EntrepotUtilisateur;

  constructor({
    adaptateurHachage,
    entrepotUtilisateur,
  }: {
    adaptateurHachage: AdaptateurHachage;
    entrepotUtilisateur: EntrepotUtilisateur;
  }) {
    this.adaptateurHachage = adaptateurHachage;
    this.entrepotUtilisateur = entrepotUtilisateur;
    this.knex = Knex(config);
  }

  async ajoute(jeu: Jeu): Promise<void> {
    await this.knex('jeux').insert({
      id: jeu.id,
      nom: jeu.nom,
      sequence: jeu.sequence,
      id_enseignant: jeu.enseignant
        ? this.adaptateurHachage.hache(jeu.enseignant.email)
        : null,
    });
  }

  async tous(): Promise<Jeu[]> {
    return Promise.all(
      (await this.knex('jeux')).map(async (jeuEnDB) => {
        const enseignant = await this.entrepotUtilisateur.parEmailHache(
          jeuEnDB.id_enseignant,
        );
        return new Jeu({
          id: jeuEnDB.id,
          nom: jeuEnDB.nom,
          enseignant,
          sequence: jeuEnDB.sequence,
        });
      }),
    );
  }
}
