import { EntrepotSelectionEnseignants } from '../metier/entrepotSelectionEnseignants';
import { Selection } from '../metier/selection';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';
import {
  creeRecupereRessourceHttp,
  RecupereRessourceHttp,
} from './recupereRessourceHttp';

export type SelectionEnseignantsGrist = {
  id: number;
  fields: {
    Id2: string;
    Titre: string;
    Explication: string;
    Ressources2: string[];
    Couleur_de_fond: string;
  };
};

export class EntrepotSelectionEnseignantsGrist
  extends EntrepotGrist<SelectionEnseignantsGrist>
  implements EntrepotSelectionEnseignants
{
  constructor(
    ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseGrist<SelectionEnseignantsGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    const grist = adaptateurEnvironnement.grist();
    super(
      ressourcesCyberGrist,
      grist.selectionEnseignants().idDocument,
      grist.selectionEnseignants().idTable,
    );
  }

  async tous(): Promise<Selection[]> {
    const reponse = await this.appelleGrist();
    return reponse.records.map(
      (record) =>
        new Selection({
          id: record.fields.Id2,
          titre: record.fields.Titre,
          explication: record.fields.Explication,
          ressources: this.aseptiseListe(record.fields.Ressources2),
          couleurDeFond: record.fields.Couleur_de_fond,
        }),
    );
  }
}
