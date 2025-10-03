import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('jeux', (table) => {
    table.jsonb('photos');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('jeux', (table) => {
    table.dropColumn('photos');
  });
}
