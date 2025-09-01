import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { Utilisateur } from '../metier/utilisateur';
import { AdaptateurChiffrement } from './adaptateurChiffrement';
import { AdaptateurHachage } from './adaptateurHachage';

export class EntrepotUtilisateurPostgres implements EntrepotUtilisateur {
  knex: Knex.Knex;
  adaptateurHachage: AdaptateurHachage;
  adaptateurChiffrement: AdaptateurChiffrement;

  constructor({
    adaptateurHachage,
    adaptateurChiffrement,
  }: {
    adaptateurHachage: AdaptateurHachage;
    adaptateurChiffrement: AdaptateurChiffrement;
  }) {
    this.knex = Knex(config);
    this.adaptateurHachage = adaptateurHachage;
    this.adaptateurChiffrement = adaptateurChiffrement;
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
