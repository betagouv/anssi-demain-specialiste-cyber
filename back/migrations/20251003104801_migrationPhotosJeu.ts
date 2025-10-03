import type { Knex } from 'knex';

type RepresentationJeu = {
  id: string;
  nom: string;
  sequence: string;
  id_enseignant: string | null;
  nom_etablissement: string;
  classe: string;
  discipline: string;
  eleves: string[];
  categorie: string;
  thematiques: string[];
  description: string;
  temoignages: string[];
};

export async function up(knex: Knex): Promise<void> {
  knex('jeux').then((lignes: RepresentationJeu[]) => {
    const misesAJour = lignes.map(async (ligne) => {
      return knex('jeux')
        .where('id', ligne.id)
        .update({
          photos: {
            courveture: {
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
