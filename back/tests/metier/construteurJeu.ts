import { Jeu } from '../../src/metier/jeu';
import { Constructeur } from '../constructeur';
import * as crypto from 'node:crypto';
import { Utilisateur } from '../../src/metier/utilisateur';

class ConstructeurDeJeu implements Constructeur<Jeu> {
  private identifiant: string = crypto.randomUUID();
  private nom: string = 'cybercluedo';
  private enseignant: Utilisateur | undefined;

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

  construis(): Jeu {
    return new Jeu({
      id: this.identifiant,
      nom: this.nom,
      ...(this.enseignant && { enseignant: this.enseignant }),
      sequence: 'heure',
      nomEtablissement: '',
      classe: 'maternelle',
      discipline: 'francais',
      eleves: [],
      categorie: 'autre',
      thematiques: [],
      description: '',
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
