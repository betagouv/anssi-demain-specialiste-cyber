import { Metier } from '../../src/metier/metier';
import { Constructeur } from '../constructeur';

export class ConstructeurMetier implements Constructeur<Metier> {
  private id: number = Math.round(Math.random() * 1000);

  construis(): Metier {
    return {
      id: this.id,
      titre: 'Un titre',
      fonction: 'Une fonction',
      description: 'Une description',
      missionPrincipale: 'La mission',
      postures: [],
      formationsCibles: [],
      preRequis: [],
      remuneration: {
        junior: 0,
        senior: 0,
      },
      metiersProches: [],
      liens: {
        illustration: '',
        dataemploi: '',
        metierscope: '',
        videos: [],
      },
    };
  }
}

export const unMetier = () => new ConstructeurMetier();
