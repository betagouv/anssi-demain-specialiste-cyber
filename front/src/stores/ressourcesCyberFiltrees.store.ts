import { derived } from 'svelte/store';
import {
  lesNiveauxDesRessourcesCyber,
  lesSelectionsDesRessourcesCyber,
  lesThematiquesCyber,
  type RessourceCyber,
} from '../ressourceCyber';
import { rechercheParNiveau } from './rechercheParNiveau.store';
import { rechercheParSelection } from './rechercheParSelection.store';
import { rechercheParThematique } from './rechercheParThematique.store';
import { ressourcesCyberStore } from './ressourcesCyber.store';

export type RessourcesCyberFiltrees = {
  resultat: RessourceCyber[];
  thematiques: string[];
  selections: string[];
  niveaux: string[];
};

export const ressourcesCyberFiltrees = derived(
  [ressourcesCyberStore, rechercheParThematique, rechercheParSelection],
  ([$store]): RessourcesCyberFiltrees => {
    const resultat = $store.filter(
      (ressourceCyber: RessourceCyber) =>
        rechercheParThematique.ok(ressourceCyber) &&
        rechercheParSelection.ok(ressourceCyber) &&
        rechercheParNiveau.ok(ressourceCyber)
    );

    const thematiques = lesThematiquesCyber($store);
    const selections = lesSelectionsDesRessourcesCyber($store);
    const niveaux: string[] = lesNiveauxDesRessourcesCyber($store);

    return { resultat, thematiques, selections, niveaux };
  }
);
