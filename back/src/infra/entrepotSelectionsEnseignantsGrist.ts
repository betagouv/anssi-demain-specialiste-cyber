import { EntrepotSelectionsEnseignants } from '../metier/entrepotSelectionsEnseignants';
import { Selection } from '../metier/selection';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';
import {
  creeRecupereRessourceHttp,
  RecupereRessourceHttp,
} from './recupereRessourceHttp';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';

export type SelectionEnseignantsGrist = {
  id: number;
  fields: {
    Id2: string;
    Titre: string;
    Explication: string;
    Ressources: number[];
    Couleur_de_fond: string;
  };
};

export class EntrepotSelectionsEnseignantsGrist
  extends EntrepotGrist<SelectionEnseignantsGrist>
  implements EntrepotSelectionsEnseignants
{
  constructor(
    private entrepotRessourcesCyber: EntrepotRessourcesCyber,
    ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseGrist<SelectionEnseignantsGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    const grist = adaptateurEnvironnement.grist();
    super(
      ressourcesCyberGrist,
      grist.idDocument,
      grist.selectionsEnseignants().idTable,
    );
  }

  async tous(): Promise<Selection[]> {
    const reponse = await this.appelleGrist();

    const toutesLesRessourcesCyber = await this.entrepotRessourcesCyber.tous();

    return reponse.records.map(
      (record) =>
        new Selection({
          id: record.fields.Id2,
          titre: record.fields.Titre,
          explication: record.fields.Explication,
          ressources: this.aseptiseListe(record.fields.Ressources).map(
            (idRessource) =>
              toutesLesRessourcesCyber.find(
                (ressource) => ressource.id === idRessource,
              )!,
          ),
          couleurDeFond: record.fields.Couleur_de_fond,
        }),
    );
  }
}
