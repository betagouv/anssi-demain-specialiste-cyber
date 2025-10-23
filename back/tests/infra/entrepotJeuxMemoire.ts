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

  async parId(id: Jeu['id']): Promise<Jeu | undefined> {
    return this.copie(this.entites.find((jeu) => jeu.id === id));
  }

  private copie(entite: Jeu | undefined) {
    if (!entite) {
      return undefined;
    }

    const jeu = new Jeu({ ...entite });
    jeu.reactions = { ...entite.reactions };
    return jeu;
  }

  async metsAjour(jeu: Jeu): Promise<void> {
    const entiteAMettreAJour = this.entites.find(
      (entite) => entite.id === jeu.id,
    );
    if (entiteAMettreAJour) {
      Object.assign(entiteAMettreAJour, jeu);
    }
  }

  async tous() {
    return [...this.entites.filter((jeu) => !jeu.estCache)];
  }
}
