import { FamilleDeMetierGrist } from '../../src/infra/entrepotFamillesDeMetierGrist';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import { ConstructeurLigneGrist, LigneGrist } from './grist';

export type LigneFamilleDeMétier = LigneGrist & FamilleDeMetierGrist;

export class ConstructeurLigneGristFamillesDeMetier extends ConstructeurLigneGrist<LigneFamilleDeMétier> {
  avecColonneCode(code: string): ConstructeurLigneGristFamillesDeMetier {
    this.avecColonneEtValeur('Famille', code);
    return this;
  }
}

export class ConstructeurRéponseFamillesDeMétierGrist {
  private _lignes: LigneFamilleDeMétier[] = [];

  ajouteUneLigne(
    ligne: LigneFamilleDeMétier,
  ): ConstructeurRéponseFamillesDeMétierGrist {
    this._lignes.push(ligne);
    return this;
  }

  construis(): ReponseGrist<LigneFamilleDeMétier> {
    return {
      records: this._lignes.map((l) => ({
        id: l.id,
        fields: l.fields,
      })),
    };
  }
}
