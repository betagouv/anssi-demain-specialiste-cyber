import { EntrepôtFonctions } from '../metier/entrepotFonctions';
import { Fonction } from '../metier/fonction';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { creeRecupereRessourceHttp, RecupereRessourceHttp } from './clientHttp';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';

export type FonctionGrist = {
  fields: {
    Fonction: string;
    Mission_principale: string;
    Lien: string;
    Temoignages: string;
    Lien_du_temoignage: string;
    Femme_de_la_cyber: boolean;
    Famille_de_metiers: string;
  };
};

export class EntrepôtFonctionsGrist
  extends EntrepotGrist<FonctionGrist>
  implements EntrepôtFonctions
{
  constructor(
    fonctionsGrist: RecupereRessourceHttp<
      ReponseGrist<FonctionGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    super(
      fonctionsGrist,
      adaptateurEnvironnement.grist().idDocument,
      adaptateurEnvironnement.grist().fonctions().idTable,
    );
  }

  async tous(): Promise<Fonction[]> {
    const réponse = await this.appelleGrist();
    return réponse.records.map((fonctionGrist) => ({
      nom: fonctionGrist.fields.Fonction,
      famille: fonctionGrist.fields.Famille_de_metiers ?? '',
      missionPrincipale: fonctionGrist.fields.Mission_principale,
      lien: fonctionGrist.fields.Lien,
      témoignage: {
        nom: fonctionGrist.fields.Temoignages,
        femme: fonctionGrist.fields.Femme_de_la_cyber,
        lien: (fonctionGrist.fields.Lien_du_temoignage ?? '')
          .split(';')[0]
          .trim(),
      },
    }));
  }

  protected cheminDeBase = (): string => {
    const idTableMétiers = adaptateurEnvironnement.grist().metiers().idTable;
    return `api/docs/${this.schema}/sql/?q=select ${this.table}.*, ${idTableMétiers}.Famille_de_metiers from ${this.table} inner join ${idTableMétiers} on ${idTableMétiers}.id=${this.table}.Famille_metiers where Publie is not null`;
  };
}
