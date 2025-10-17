import { EntrepotSelectionsEnseignants } from '../metier/entrepotSelectionsEnseignants';
import { Selection } from '../metier/selection';

export class EntrepotSelectionsEnseignantsStatique
  implements EntrepotSelectionsEnseignants
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
