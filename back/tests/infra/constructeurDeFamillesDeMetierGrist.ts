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

  ajouteUneLigne(ligne: LigneFamilleDeMétier): ConstructeurRéponseFamillesDeMétierGrist;
  ajouteUneLigne(ligne: ConstructeurLigneGrist<LigneFamilleDeMétier>): ConstructeurRéponseFamillesDeMétierGrist;

  ajouteUneLigne(
    ligne: LigneFamilleDeMétier | ConstructeurLigneGrist<LigneFamilleDeMétier>,
  ): ConstructeurRéponseFamillesDeMétierGrist {
    const ligneConstruite = ligne instanceof ConstructeurLigneGrist ? ligne.construis() : ligne;
    this._lignes.push(ligneConstruite);
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
