import Knex from 'knex';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { Utilisateur } from '../metier/utilisateur';
import { AdaptateurHachage } from './adaptateurHachage';
import config from '../../knexfile';

export class EntrepotUtilisateurPostgres implements EntrepotUtilisateur {
  knex: Knex.Knex;
  adaptateurHachage: AdaptateurHachage;

  constructor({ adaptateurHachage }: { adaptateurHachage: AdaptateurHachage }) {
    this.knex = Knex(config);
    this.adaptateurHachage = adaptateurHachage;
  }

  async ajoute(_utilisateur: Utilisateur) {
    {
      throw new Error();
    }
  }
  async parEmailHache(_emailHache: string): Promise<Utilisateur | undefined> {
    throw new Error();
  }

  async existe(emailHache: string) {
    const utilisateur = await this.knex('utilisateurs')
      .where({ email_hache: emailHache })
      .first();
    return !!utilisateur;
  }

  async tous(): Promise<Utilisateur[]> {
    throw new Error();
  }
  async taille(): Promise<number> {
    throw new Error();
  }
}
