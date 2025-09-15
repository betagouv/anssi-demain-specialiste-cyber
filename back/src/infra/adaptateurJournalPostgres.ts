import { AdaptateurJournal, DonneesEvenement } from './adaptateurJournal';
import Knex from 'knex';
import { randomUUID as uuidv4 } from 'crypto';

export const adaptateurJournalPostgres = (): AdaptateurJournal => {
  const config = {
    client: 'pg',
    connection: process.env.BASE_DONNEES_JOURNAL_URL_SERVEUR,
    pool: {
      min: 0,
      max: Number.parseInt(
        process.env.BASE_DONNEES_JOURNAL_POOL_CONNEXION_MAX || '0',
      ),
    },
  };
  const knex = Knex(config);

  return {
    async consigneEvenement(donneesEvenement: DonneesEvenement): Promise<void> {
      const { type, donnees, date } = donneesEvenement;

      return knex('journal_dsc.evenements').insert({
        id: uuidv4(),
        type,
        donnees,
        date: new Date(date).toISOString(),
      });
    },
  };
};
