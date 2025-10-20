import { FournisseurHorloge } from '../../src/infra/FournisseurHorloge';

export class FournisseurHorlogeDeTest {
  static initialise(maintenant: Date) {
    FournisseurHorloge.maintenant = () => maintenant;
  }
}
