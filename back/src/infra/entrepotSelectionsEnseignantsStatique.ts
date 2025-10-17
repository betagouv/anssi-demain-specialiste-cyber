import { EntrepotSelections } from '../metier/entrepotSelections';
import { Selection } from '../metier/selection';

export class EntrepotSelectionsEnseignantsStatique
  implements EntrepotSelections
{
  async tous(): Promise<Selection[]> {
    return [
      {
        id: 'orienter',
        titre: 'Orienter',
        explication: "Aider les élèves à s'orienter vers les bonnes ressources",
        ressources: [],
        couleurDeFond: 'white',
      },
    ];
  }
}
