import Knex from 'knex';
import config from '../../knexfile';
import { adaptateurEnvironnement } from '../infra/adaptateurEnvironnement';
import {
  AdaptateurHachage,
  fabriqueAdaptateurHachage,
} from '../infra/adaptateurHachage';

export class ConsoleAdministration {
  private readonly adaptateurHachage: AdaptateurHachage;
  private knex: Knex.Knex;

  constructor() {
    this.adaptateurHachage = fabriqueAdaptateurHachage({
      adaptateurEnvironnement,
    });
    this.knex = Knex(config);
  }

  async sauvegardeLesEmpreintesDesSecretsDeHachage() {
    await this.knex.transaction(async (trx) => {
      const tousLesSecretsDeHachage = adaptateurEnvironnement
        .hachage()
        .tousLesSecretsDeHachage();

      const maj = tousLesSecretsDeHachage.map(async ({ version, secret }) => {
        const empreinte = await this.adaptateurHachage.hacheBCrypt(secret);
        return trx('secrets_hachage')
          .insert({ version, empreinte })
          .onConflict()
          .ignore();
      });

      await Promise.all(maj);
    });
  }
}
