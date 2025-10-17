import { ReponseGrist } from '../../src/infra/entrepotGrist';
import { SelectionGrist } from '../../src/infra/entrepotSelectionsGrist';
import { ConstructeurLigneGrist, LigneGrist } from './grist';

export type LigneSelection = LigneGrist & SelectionGrist;

export class ConstructeurLigneGristSelections extends ConstructeurLigneGrist<LigneSelection> {
  avecColonneId(id: string): ConstructeurLigneGristSelections {
    this.avecColonneEtValeur('Id2', id);
    return this;
  }

  avecColonneTitre(titre: string): ConstructeurLigneGristSelections {
    this.avecColonneEtValeur('Titre', titre);
    return this;
  }

  avecColonneExplication(titre: string): ConstructeurLigneGristSelections {
    this.avecColonneEtValeur('Explication', titre);
    return this;
  }

  avecColonneRessources(
    idsRessources: number[],
  ): ConstructeurLigneGristSelections {
    this.avecColonneEtListeDeValeurs('Ressources', idsRessources);
    return this;
  }

  avecColonneCouleurDeFond(couleur: string): ConstructeurLigneGristSelections {
    this.avecColonneEtValeur('Couleur_de_fond', couleur);
    return this;
  }
}

export class ConstructeurReponseSelectionsGrist {
  private _lignes: LigneSelection[] = [];

  ajouteUneLigne(ligne: LigneSelection): ConstructeurReponseSelectionsGrist {
    this._lignes.push(ligne);
    return this;
  }

  construis(): ReponseGrist<SelectionGrist> {
    return {
      records: this._lignes.map((l) => ({
        id: l.id,
        fields: l.fields,
      })),
    };
  }
}
