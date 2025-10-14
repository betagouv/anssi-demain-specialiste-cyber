import { EntrepotMetiers } from '../metier/entrepotMetiers';
import { Metier } from '../metier/metier';

export class EntrepotMetiersStatique implements EntrepotMetiers {
  async parIdentifiant(identifiant: number): Promise<Metier> {
    return {
      description: '',
      formationsCibles: [],
      liens: { illustration: '', dataemploi: '', metierscope: '', video: '' },
      metiersProches: [],
      missionPrincipale: '',
      postures: [],
      preRequis: [],
      remuneration: { junior: 0, senior: 0 },
      titre: '',
      id: identifiant,
    };
  }
  async ajoute(_metier: Metier): Promise<void> {
    throw new Error('Pas supporté sur l’entrepôt métiers.');
  }
}
