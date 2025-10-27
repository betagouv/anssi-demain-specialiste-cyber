import * as crypto from 'node:crypto';
import { Jeu, Reactions } from '../../src/metier/jeu';
import { CategorieDeJeux } from '../../src/metier/referentiels/categorieDeJeux';
import { Classe } from '../../src/metier/referentiels/classes';
import { Discipline } from '../../src/metier/referentiels/disciplines';
import { ThematiqueDeJeux } from '../../src/metier/referentiels/thematiqueDeJeux';
import { Utilisateur } from '../../src/metier/utilisateur';
import { Constructeur } from '../constructeur';

class ConstructeurDeJeu implements Constructeur<Jeu> {
  private identifiant: string = crypto.randomUUID();
  private nom: string = 'cybercluedo';
  private enseignant: Utilisateur | undefined;
  private description: string = '';
  private classe: Classe = 'maternelle';
  private categorie: CategorieDeJeux = 'autre';
  private thematiques: ThematiqueDeJeux[] = [];
  private discipline: Discipline = 'francais';
  private etablissement: string | undefined;
  private eleves: string[] = [];
  private couverture: { chemin: string } | undefined;
  private photos: { chemin: string }[] = [];
  private estCache: boolean = false;
  private reactions: Reactions = {};

  avecUnId(identifiant: string): ConstructeurDeJeu {
    this.identifiant = identifiant;
    return this;
  }

  avecUnNom(nom: string): ConstructeurDeJeu {
    this.nom = nom;
    return this;
  }

  deEnseignant(enseignant: Utilisateur): ConstructeurDeJeu {
    this.enseignant = enseignant;
    return this;
  }

  deClasse(classe: Classe): ConstructeurDeJeu {
    this.classe = classe;
    return this;
  }

  avecUneDescription(description: string): ConstructeurDeJeu {
    this.description = description;
    return this;
  }

  deCategorie(categorie: CategorieDeJeux): ConstructeurDeJeu {
    this.categorie = categorie;
    return this;
  }

  avecLesThematiques(thematiques: ThematiqueDeJeux[]): ConstructeurDeJeu {
    this.thematiques = thematiques;
    return this;
  }

  pourLaDiscipline(discipline: Discipline): ConstructeurDeJeu {
    this.discipline = discipline;
    return this;
  }

  dansEtablissement(etablissement: string): ConstructeurDeJeu {
    this.etablissement = etablissement;
    return this;
  }

  avecUneCouverture(chemin: string): ConstructeurDeJeu {
    this.couverture = { chemin };
    return this;
  }

  avecUnePhoto(chemin: string): ConstructeurDeJeu {
    this.photos.push({ chemin });
    return this;
  }

  avecEleves(eleves: string[]) {
    this.eleves = eleves;
    return this;
  }

  cache(estCache: boolean) {
    this.estCache = estCache;
    return this;
  }

  avecUneReaction(reaction: string, compte: number) {
    this.reactions[reaction] = compte;
    return this;
  }

  construis(): Jeu {
    return new Jeu({
      id: this.identifiant,
      nom: this.nom,
      ...(this.enseignant && { enseignant: this.enseignant }),
      sequence: 'heure',
      // @ts-expect-error -- undefined dans les tests!
      nomEtablissement: this.etablissement,
      classe: this.classe,
      discipline: this.discipline,
      eleves: this.eleves,
      categorie: this.categorie,
      thematiques: this.thematiques,
      description: this.description,
      temoignages: [],
      photos: {
        couverture: this.couverture || { chemin: '' },
        photos: this.photos,
      },
      estCache: this.estCache,
      reactions: this.reactions,
    });
  }
}

export const unJeu = () => new ConstructeurDeJeu();
