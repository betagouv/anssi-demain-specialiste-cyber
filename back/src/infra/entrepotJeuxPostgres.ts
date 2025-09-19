import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { Jeu } from '../metier/jeu';
import { Classe } from '../metier/referentiels/classes';
import { Discipline } from '../metier/referentiels/disciplines';
import { Sequence } from '../metier/referentiels/sequence';
import { Utilisateur } from '../metier/utilisateur';
import { AdaptateurHachage } from './adaptateurHachage';

type JeuEnDB = {
  id: string;
  nom: string;
  sequence: string;
  id_enseignant: string | null;
  nom_etablissement: string;
  classe: string;
  discipline: string;
  eleves: string[];
};

type JeuEnDBInsertion = Omit<JeuEnDB, 'eleves'> & {
  eleves: string; // IMPORTANT, Knex ne sait pas gérer l'insertion de tableau directement, cf : https://knexjs.org/guide/schema-builder.html#json
};

export class EntrepotJeuxPostgres implements EntrepotJeux {
  knex: Knex.Knex;
  private adaptateurHachage: AdaptateurHachage;
  private entrepotUtilisateur: EntrepotUtilisateur;

  constructor({
    adaptateurHachage,
    entrepotUtilisateur,
  }: {
    adaptateurHachage: AdaptateurHachage;
    entrepotUtilisateur: EntrepotUtilisateur;
  }) {
    this.adaptateurHachage = adaptateurHachage;
    this.entrepotUtilisateur = entrepotUtilisateur;
    this.knex = Knex(config);
  }

  async ajoute(jeu: Jeu): Promise<void> {
    await this.knex('jeux').insert({
      id: jeu.id,
      nom: jeu.nom,
      sequence: jeu.sequence,
      id_enseignant: jeu.enseignant
        ? this.adaptateurHachage.hache(jeu.enseignant.email)
        : null,
      nom_etablissement: jeu.nomEtablissement,
      classe: jeu.classe,
      discipline: jeu.discipline,
      eleves: JSON.stringify(jeu.eleves),
    } satisfies JeuEnDBInsertion);
  }

  async tous(): Promise<Jeu[]> {
    return Promise.all(
      (await this.knex('jeux')).map(this.donneesEnDbVersMetier),
    );
  }

  async lesJeuxDe(utilisateur: Utilisateur): Promise<Jeu[]> {
    return Promise.all(
      (
        await this.knex<JeuEnDB>('jeux').where({
          id_enseignant: this.adaptateurHachage.hache(utilisateur.email),
        })
      ).map(this.donneesEnDbVersMetier),
    );
  }

  private async donneesEnDbVersMetier(jeuEnDB: JeuEnDB): Promise<Jeu> {
    const enseignant = jeuEnDB.id_enseignant
      ? await this.entrepotUtilisateur.parEmailHache(jeuEnDB.id_enseignant)
      : undefined;
    return new Jeu({
      id: jeuEnDB.id,
      nom: jeuEnDB.nom,
      enseignant,
      sequence: jeuEnDB.sequence as Sequence,
      nomEtablissement: jeuEnDB.nom_etablissement,
      classe: jeuEnDB.classe as Classe,
      discipline: jeuEnDB.discipline as Discipline,
      eleves: jeuEnDB.eleves ?? [],
    });
  }
}
