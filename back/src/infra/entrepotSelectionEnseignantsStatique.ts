import { EntrepotSelectionEnseignants } from '../metier/entrepotSelectionEnseignants';
import { Selection } from '../metier/selection';

export class EntrepotSelectionEnseignantsStatique
  implements EntrepotSelectionEnseignants
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
