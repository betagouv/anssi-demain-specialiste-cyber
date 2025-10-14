import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { type RessourceCyber } from '../metier/ressourceCyber';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import {
  creeRecupereRessourceHttp,
  RecupereRessourceHttp,
} from './recupereRessourceHttp';

export type RessourceCyberGrist = {
  id: number;
  fields: {
    A: string;
    Titre: string;
    Description: string;
    Besoins: string[];
    Thematiques: string[];
    Type: string[];
    Cible: string[];
    Parcours_sur_page: string[];
    Label_DSC: boolean;
    Cycle_si_eleves: string[];
    Porteur: string[];
    Lien: string;
    URL_illustration: string;
  };
};

export class EntrepotRessourcesCyberGrist
  extends EntrepotGrist<RessourceCyberGrist>
  implements EntrepotRessourcesCyber
{
  constructor(
    ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseGrist<RessourceCyberGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    const grist = adaptateurEnvironnement.grist();
    super(
      ressourcesCyberGrist,
      grist.ressourcesCyber().idDocument,
      grist.ressourcesCyber().idTable,
    );
  }

  async tous(): Promise<RessourceCyber[]> {
    const reponse = await this.appelleGrist();
    return reponse.records.map((record) => ({
      id: record.id,
      titre: record.fields.Titre,
      thematiques: record.fields.Thematiques.slice(1),
      publicsCible: record.fields.Cible.slice(1),
      niveaux: record.fields.Cycle_si_eleves.slice(1),
      types: record.fields.Type.slice(1),
      besoins: record.fields.Besoins.slice(1),
      description: record.fields.Description,
      urlIllustration: record.fields.URL_illustration,
      estCertifiee: record.fields.Label_DSC,
      lienExterne: record.fields.Lien,
    }));
  }

  async ajoute() {
    throw new Error('Pas supportée');
  }
}
