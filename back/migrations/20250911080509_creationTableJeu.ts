import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('jeux', (table) => {
    table.uuid('id').primary();
    table.text('nom');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('jeux');
}
