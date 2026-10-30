import { FonctionGrist } from '../../src/infra/entrepotFonctionsGrist';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import { ConstructeurLigneGrist, LigneGrist } from './grist';

export type LigneFonction = LigneGrist & FonctionGrist;

export class ConstructeurLigneGristFonctions extends ConstructeurLigneGrist<LigneFonction> {}

export class ConstructeurRéponseFonctionsGrist {
  private _lignes: LigneFonction[] = [];

  ajouteUneLigne(ligne: LigneFonction): ConstructeurRéponseFonctionsGrist {
    this._lignes.push(ligne);
    return this;
  }

  construis(): ReponseGrist<LigneFonction> {
    return {
      records: this._lignes.map((l) => ({
        id: l.id,
        fields: l.fields,
      })),
    };
  }
}
