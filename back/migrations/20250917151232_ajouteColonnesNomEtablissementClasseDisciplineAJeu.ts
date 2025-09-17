import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('jeux', (table) => {
    table.string('nom_etablissement');
    table.string('classe');
    table.string('discipline');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('jeux', (table) => {
    table.dropColumn('nom_etablissement');
    table.dropColumn('classe');
    table.dropColumn('discipline');
  });
}
