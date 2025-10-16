import { ReponseGrist } from '../../src/infra/entrepotGrist';
import { SelectionEnseignantsGrist } from '../../src/infra/entrepotSelectionEnseignantsGrist';
import { ConstructeurLigneGrist, LigneGrist } from './grist';

export type LigneSelectionEnseignant = LigneGrist & SelectionEnseignantsGrist;

export class ConstructeurLigneGristSelectionEnseignants extends ConstructeurLigneGrist<LigneSelectionEnseignant> {
  avecColonneId(id: string): ConstructeurLigneGristSelectionEnseignants {
    this.avecColonneEtValeur('Id2', id);
    return this;
  }

  avecColonneTitre(titre: string): ConstructeurLigneGristSelectionEnseignants {
    this.avecColonneEtValeur('Titre', titre);
    return this;
  }

  avecColonneExplication(
    titre: string,
  ): ConstructeurLigneGristSelectionEnseignants {
    this.avecColonneEtValeur('Explication', titre);
    return this;
  }

  avecColonneRessources(
    idsRessources: number[],
  ): ConstructeurLigneGristSelectionEnseignants {
    this.avecColonneEtListeDeValeurs('Ressources2', idsRessources);
    return this;
  }

  avecColonneCouleurDeFond(
    couleur: string,
  ): ConstructeurLigneGristSelectionEnseignants {
    this.avecColonneEtValeur('Couleur_de_fond', couleur);
    return this;
  }
}

export class ConstructeurReponseSelectionEnseignantsGrist {
  private _lignes: LigneSelectionEnseignant[] = [];

  ajouteUneLigne(
    ligne: LigneSelectionEnseignant,
  ): ConstructeurReponseSelectionEnseignantsGrist {
    this._lignes.push(ligne);
    return this;
  }

  construis(): ReponseGrist<SelectionEnseignantsGrist> {
    return {
      records: this._lignes.map((l) => ({
        id: l.id,
        fields: l.fields,
      })),
    };
  }
}
