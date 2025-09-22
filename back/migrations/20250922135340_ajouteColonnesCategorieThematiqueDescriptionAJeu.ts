import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('jeux', (table) => {
    table.string('categorie');
    table.jsonb('thematiques');
    table.text('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('jeux', (table) => {
    table.dropColumn('categorie');
    table.dropColumn('thematiques');
    table.dropColumn('description');
  });
}
