import { EntrepotSelectionEnseignants } from '../../src/metier/entrepotSelectionEnseignants';
import { Selection } from '../../src/metier/selection';
import { EntrepotMemoire } from './entrepotMemoire';
import { EntrepotRessourcesCyberMemoire } from './entrepotRessourceCyberMemoire';

export class EntrepotSelectionEnseignantsMemoire
  extends EntrepotMemoire<Selection>
  implements EntrepotSelectionEnseignants
{
  constructor(private entrepotRessourcesCyber: EntrepotRessourcesCyberMemoire) {
    super();
  }

  override async tous(): Promise<Selection[]> {
    const selections = await super.tous();
    const ressources = await this.entrepotRessourcesCyber.tous();

    selections.forEach((selection) => {
      selection.ressources = ressources.filter((r) =>
        selection.ressources.includes(r.titre),
      );
    });

    return selections;
  }
}
