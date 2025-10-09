import type { Knex } from 'knex';

type RepresentationJeu = {
  id: string;
};

export async function up(knex: Knex): Promise<void> {
  knex('jeux')
    .whereRaw(`photos -> 'courveture' IS NOT NULL`)
    .then((lignes: RepresentationJeu[]) => {
      const misesAJour = lignes.map(async (ligne) => {
        return knex('jeux')
          .where('id', ligne.id)
          .update({
            photos: {
              couverture: {
                chemin: '/image-generique.svg',
              },
              photos: [],
            },
          });
      });
      return Promise.all(misesAJour);
    });
}

export async function down(_knex: Knex): Promise<void> {}
