import { EntrepotJeux } from '../../src/metier/entrepotJeux';
import { Jeu } from '../../src/metier/jeu';
import { Utilisateur } from '../../src/metier/utilisateur';
import { EntrepotMemoire } from './entrepotMemoire';

export class EntrepotJeuxMemoire
  extends EntrepotMemoire<Jeu>
  implements EntrepotJeux
{
  async lesJeuxDe(utilisateur: Utilisateur): Promise<Jeu[]> {
    return this.entites.filter(
      (jeu) => jeu.enseignant && jeu.enseignant.email === utilisateur.email,
    );
  }
}
