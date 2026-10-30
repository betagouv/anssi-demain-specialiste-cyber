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
      famille: '',
      missionPrincipale: fonctionGrist.fields.Mission_principale,
      lien: fonctionGrist.fields.Lien,
      témoignage: {
        nom: fonctionGrist.fields.Temoignages,
        femme: fonctionGrist.fields.Femme_de_la_cyber,
        lien: fonctionGrist.fields.Lien_du_temoignage,
      },
    }));
  }
}
