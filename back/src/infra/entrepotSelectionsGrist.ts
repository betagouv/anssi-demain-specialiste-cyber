import { EntrepotSelections } from '../metier/entrepotSelections';
import { Selection } from '../metier/selection';
import { adaptateurEnvironnement, TableGrist } from './adaptateurEnvironnement';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';
import { creeRecupereRessourceHttp, RecupereRessourceHttp } from './clientHttp';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';

export type SelectionGrist = {
  id: number;
  fields: {
    Id2: string;
    Titre: string;
    Explication: string;
    Ressources: number[];
    Couleur_de_fond: string;
  };
};

export class EntrepotSelectionsGrist
  extends EntrepotGrist<SelectionGrist>
  implements EntrepotSelections
{
  constructor(
    private entrepotRessourcesCyber: EntrepotRessourcesCyber,
    tableGrist: TableGrist,
    ressourcesCyberGrist: RecupereRessourceHttp<
      ReponseGrist<SelectionGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    const grist = adaptateurEnvironnement.grist();
    super(ressourcesCyberGrist, grist.idDocument, tableGrist.idTable);
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
