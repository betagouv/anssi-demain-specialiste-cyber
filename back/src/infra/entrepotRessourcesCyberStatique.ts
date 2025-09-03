import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { RessourceCyber } from '../metier/ressourceCyber';

export class EntrepotRessourcesCyberStatique
  implements EntrepotRessourcesCyber {
  async tous(): Promise<RessourceCyber[]> {
    return [
      {
        id: 1000,
        titre: 'La sécurité pour tous',
        thematiques: [],
        selections: [],
        niveaux: [],
        types: [],
        besoins: [],
      },
    ];
  }
}
