import { Jeu } from '../../src/metier/jeu';
import { Constructeur } from '../constructeur';
import * as crypto from 'node:crypto';
import { Utilisateur } from '../../src/metier/utilisateur';
import { Classe } from '../../src/metier/referentiels/classes';
import { CategorieDeJeux } from '../../src/metier/referentiels/categorieDeJeux';
import { ThematiqueDeJeux } from '../../src/metier/referentiels/thematiqueDeJeux';
import { Discipline } from '../../src/metier/referentiels/disciplines';

class ConstructeurDeJeu implements Constructeur<Jeu> {
  private identifiant: string = crypto.randomUUID();
  private nom: string = 'cybercluedo';
  private enseignant: Utilisateur | undefined;
  private description: string = '';
  private classe: Classe = 'maternelle';
  private categorie: CategorieDeJeux = 'autre';
  private thematiques: ThematiqueDeJeux[] = [];
  private discipline: Discipline = 'francais';
  private etablissement: string = '';
  private eleves: string[] = [];

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

  avecEleves(eleves: string[]) {
    this.eleves = eleves;
    return this;
  }

  construis(): Jeu {
    return new Jeu({
      id: this.identifiant,
      nom: this.nom,
      ...(this.enseignant && { enseignant: this.enseignant }),
      sequence: 'heure',
      nomEtablissement: this.etablissement,
      classe: this.classe,
      discipline: this.discipline,
      eleves: this.eleves,
      categorie: this.categorie,
      thematiques: this.thematiques,
      description: this.description,
      temoignages: [],
      photos: {
        couverture: {
          chemin: 'un-chemin',
        },
        photos: [],
      },
    });
  }
}

export const unJeu = () => new ConstructeurDeJeu();
