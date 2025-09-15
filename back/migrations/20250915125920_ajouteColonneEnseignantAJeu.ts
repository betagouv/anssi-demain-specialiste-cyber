import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('jeux', (table) => {
    table.string('id_enseignant');
    table.foreign('id_enseignant').references('utilisateurs.email_hache');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('jeux', (table) => {
    table.dropForeign('id_enseignant');
    table.dropColumn('id_enseignant');
  });
}
