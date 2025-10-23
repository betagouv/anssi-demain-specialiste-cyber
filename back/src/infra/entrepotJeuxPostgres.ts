import Knex from 'knex';
import config from '../../knexfile';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { Jeu, Temoignage } from '../metier/jeu';
import { CategorieDeJeux } from '../metier/referentiels/categorieDeJeux';
import { Classe } from '../metier/referentiels/classes';
import { Discipline } from '../metier/referentiels/disciplines';
import { Sequence } from '../metier/referentiels/sequence';
import { Utilisateur } from '../metier/utilisateur';
import { AdaptateurHachage } from './adaptateurHachage';
import { ThematiqueDeJeux } from '../metier/referentiels/thematiqueDeJeux';
import { AdaptateurEnvironnement } from './adaptateurEnvironnement';

type FichierImage = {
  chemin: string;
};

type PhotosJeu = {
  couverture: FichierImage;
  photos: FichierImage[];
};

type JeuEnDB = {
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
  photos: PhotosJeu;
  consentement: boolean;
  reactions: Record<string, number>;
  est_cache: boolean;
};

type JeuEnDBInsertion = Omit<
  JeuEnDB,
  'eleves' | 'thematiques' | 'temoignages'
> & {
  eleves: string; // IMPORTANT, Knex ne sait pas gérer l'insertion de tableau directement, cf : https://knexjs.org/guide/schema-builder.html#json
  thematiques: string; // IMPORTANT, Knex ne sait pas gérer l'insertion de tableau directement, cf : https://knexjs.org/guide/schema-builder.html#json
  temoignages: string; // IMPORTANT, Knex ne sait pas gérer l'insertion de tableau directement, cf : https://knexjs.org/guide/schema-builder.html#json
};

export class EntrepotJeuxPostgres implements EntrepotJeux {
  knex: Knex.Knex;
  private adaptateurHachage: AdaptateurHachage;
  private entrepotUtilisateur: EntrepotUtilisateur;
  private adaptateurEnvironnement: AdaptateurEnvironnement;

  constructor({
    adaptateurHachage,
    entrepotUtilisateur,
    adaptateurEnvironnement,
  }: {
    adaptateurHachage: AdaptateurHachage;
    entrepotUtilisateur: EntrepotUtilisateur;
    adaptateurEnvironnement: AdaptateurEnvironnement;
  }) {
    this.adaptateurHachage = adaptateurHachage;
    this.entrepotUtilisateur = entrepotUtilisateur;
    this.adaptateurEnvironnement = adaptateurEnvironnement;
    this.knex = Knex(config);
  }

  async metsAjour(jeu: Jeu): Promise<void> {
    await this.knex('jeux')
      .where({ id: jeu.id })
      .update({
        nom: jeu.nom,
        sequence: jeu.sequence,
        id_enseignant: jeu.enseignant
          ? this.adaptateurHachage.hache(jeu.enseignant.email)
          : null,
        nom_etablissement: jeu.nomEtablissement,
        classe: jeu.classe,
        discipline: jeu.discipline,
        eleves: JSON.stringify(jeu.eleves),
        categorie: jeu.categorie,
        thematiques: JSON.stringify(jeu.thematiques),
        description: jeu.description,
        temoignages: JSON.stringify(jeu.temoignages),
        photos: jeu.photos,
        consentement: jeu.consentement,
        reactions: jeu.reactions,
      });
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
      categorie: jeu.categorie,
      thematiques: JSON.stringify(jeu.thematiques),
      description: jeu.description,
      temoignages: JSON.stringify(jeu.temoignages),
      photos: jeu.photos,
      consentement: jeu.consentement,
      reactions: jeu.reactions,
      est_cache: jeu.estCache,
    } satisfies JeuEnDBInsertion);
  }

  async tous(): Promise<Jeu[]> {
    return Promise.all(
      (await this.knex('jeux')).map((jeu) => this.donneesEnDbVersMetier(jeu)),
    );
  }

  async lesJeuxDe(utilisateur: Utilisateur): Promise<Jeu[]> {
    return Promise.all(
      (
        await this.knex<JeuEnDB>('jeux').where({
          id_enseignant: this.adaptateurHachage.hache(utilisateur.email),
        })
      ).map((jeu) => this.donneesEnDbVersMetier(jeu)),
    );
  }

  async parId(id: Jeu['id']): Promise<Jeu | undefined> {
    try {
      const jeuEnDB = await this.knex<JeuEnDB>('jeux')
        .where({
          id,
        })
        .first();
      return jeuEnDB ? this.donneesEnDbVersMetier(jeuEnDB) : undefined;
    } catch {
      return undefined;
    }
  }

  private prefixeCheminParUrl(image: { chemin: string }) {
    if (this.adaptateurEnvironnement.televersementEnMemoire()) return image;
    const url = this.adaptateurEnvironnement.cellarPhotosJeux();
    return {
      chemin: new URL(image.chemin, url).toString(),
    };
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
      categorie: jeuEnDB.categorie as CategorieDeJeux,
      thematiques: (jeuEnDB.thematiques ?? []) as ThematiqueDeJeux[],
      description: jeuEnDB.description,
      temoignages:
        jeuEnDB.temoignages?.map((j) => j as unknown as Temoignage) ?? [],
      photos: {
        couverture: this.prefixeCheminParUrl(jeuEnDB.photos.couverture),
        photos: jeuEnDB.photos.photos.map((p) => this.prefixeCheminParUrl(p)),
      },
      consentement: jeuEnDB.consentement,
      reactions: jeuEnDB.reactions,
      estCache: jeuEnDB.est_cache,
    });
  }
}
