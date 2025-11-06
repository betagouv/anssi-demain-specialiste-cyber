import { ReponseGrist } from '../../src/infra/entrepotGrist';
import { MetierGrist } from '../../src/infra/entrepotMetiersGrist';
import { ConstructeurLigneGrist, LigneGrist } from './grist';

export type LigneMetier = LigneGrist & MetierGrist;

export class ConstructeurLigneGristMetiers extends ConstructeurLigneGrist<LigneMetier> {
  avecColonneVideos(videos: string): ConstructeurLigneGristMetiers {
    this.avecColonneEtValeur('lien_video', videos);
    return this;
  }
}

export class ConstructeurReponseMetiersGrist {
  private _lignes: LigneMetier[] = [];

  ajouteUneLigne(ligne: LigneMetier): ConstructeurReponseMetiersGrist {
    this._lignes.push(ligne);
    return this;
  }

  construis(): ReponseGrist<LigneMetier> {
    return {
      records: this._lignes.map((l) => ({
        id: l.id,
        fields: l.fields,
      })),
    };
  }
}
