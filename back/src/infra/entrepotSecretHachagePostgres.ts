import Knex from 'knex';
import config from '../../knexfile';

export type SecretHachage = { version: number; empreinte: string };

export interface EntrepotSecretHachage {
  tous: () => Promise<SecretHachage[]>;
}

export class EntrepotSecretHachagePostgres implements EntrepotSecretHachage {
  knex: Knex.Knex;

  constructor() {
    this.knex = Knex(config);
  }

  async tous(): Promise<SecretHachage[]> {
    const empreintes = await this.knex('secrets_hachage');
    return empreintes.map(({version, empreinte}) => ({version, empreinte}));
  }
}
