import z from 'zod';
import { schemaJeu } from '../../src/api/ressourceMesJeux';
import { ThematiqueDeJeux } from '../../src/metier/referentiels/thematiqueDeJeux';
import { Constructeur } from '../constructeur';

export type CorpsRequeteDeJeu = z.infer<typeof schemaJeu>;

class ConstructeurRequeteDeJeu implements Constructeur<CorpsRequeteDeJeu> {
  private nom: string = 'Cluedo';
  private nomEtablissement: string = 'Lycée de la mer';

  private temoignages: { details: string; prenom: string }[] = [
    {
      prenom: 'Jean',
      details: 'Un premier témoignage',
    },
    {
      prenom: 'Paul',
      details: 'Un second témoignage',
    },
    {
      prenom: 'Pierre',
      details: 'Un troisième et dernier démoignage',
    },
  ];

  private evaluations: {
    evaluationDecouverte: number;
    evaluationSatisfactionGenerale: number;
    precisions?: string;
    evaluationInteret: number;
  } = {
    evaluationInteret: 1,
    evaluationSatisfactionGenerale: 2,
    evaluationDecouverte: 3,
  };
  private eleves: string[] = ['Gontran'];
  private thematiques: ThematiqueDeJeux[] = ['menace-cyber', 'orientation'];
  private description: string = 'Un texte descriptif du jeu';
  private consentement: boolean = false;

  avecUnNom(nom: string): ConstructeurRequeteDeJeu {
    this.nom = nom;
    return this;
  }

  avecUnNomEtablissement(nomEtablissement: string): ConstructeurRequeteDeJeu {
    this.nomEtablissement = nomEtablissement;
    return this;
  }

  sansTemoignages(): ConstructeurRequeteDeJeu {
    this.temoignages = [];
    return this;
  }

  avecTemoignages(
    temoignages: { details: string; prenom: string }[],
  ): ConstructeurRequeteDeJeu {
    this.temoignages = temoignages;
    return this;
  }

  avecEvaluations(evaluations: {
    evaluationDecouverte: number;
    evaluationSatisfactionGenerale: number;
    precisions: string;
    evaluationInteret: number;
  }): ConstructeurRequeteDeJeu {
    this.evaluations = evaluations;
    return this;
  }

  sansEleves(): ConstructeurRequeteDeJeu {
    this.eleves = [];
    return this;
  }

  ajouteUnEleve(nomEleve: string): ConstructeurRequeteDeJeu {
    this.eleves.push(nomEleve);
    return this;
  }

  sansThematiques(): ConstructeurRequeteDeJeu {
    this.thematiques = [];
    return this;
  }

  avecUneDescription(description: string): ConstructeurRequeteDeJeu {
    this.description = description;
    return this;
  }

  construis(): CorpsRequeteDeJeu {
    return {
      nom: this.nom,
      sequence: 'heure',
      nomEtablissement: this.nomEtablissement,
      discipline: 'mathematiques',
      classe: 'cp',
      eleves: this.eleves,
      categorie: 'simulation',
      thematiques: this.thematiques,
      description: this.description,
      temoignages: this.temoignages,
      consentement: this.consentement,
      ...this.evaluations,
    };
  }
}

export const uneRequeteDeJeuValide = () => new ConstructeurRequeteDeJeu();
