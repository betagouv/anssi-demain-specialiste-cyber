import { EntrepotMetiers } from '../../src/metier/entrepotMetiers';
import { Metier } from '../../src/metier/metier';
import { EntrepotMemoire } from './entrepotMemoire';

export class EntrepotMetiersMemoire
  extends EntrepotMemoire<Metier>
  implements EntrepotMetiers
{
  async parIdentifiant(identifiant: number): Promise<Metier | undefined> {
    return this.entites.find((f) => f.id === identifiant);
  }
}
