import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { type RessourceCyber } from '../metier/ressourceCyber';

export class EntrepotRessourcesCyberStatique
  implements EntrepotRessourcesCyber
{
  async tous(): Promise<RessourceCyber[]> {
    return [
      {
        id: 1000,
        titre: 'La sécurité pour tous',
        thematiques: [],
        publicsCible: [],
        niveaux: [],
        types: [],
        besoins: [],
        description: 'Description',
        urlIllustration: 'http://monillu.png',
      },
    ];
  }

  async ajoute() {
    throw new Error('Pas supportée');
  }
}
