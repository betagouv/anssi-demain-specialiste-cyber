import { derived } from 'svelte/store';
import {
  lesSelectionsDesRessourcesCyber,
  lesThematiquesCyber,
  type RessourceCyber,
} from '../ressourceCyber';
import { rechercheParThematique } from './rechercheParThematique.store';
import { ressourcesCyberStore } from './ressourcesCyber.store';
import { rechercheParSelection } from './rechercheParSelection.store';

export type RessourcesCyberFiltrees = {
  resultat: RessourceCyber[];
  thematiques: string[];
  selections: string[];
};

export const ressourcesCyberFiltrees = derived(
  [ressourcesCyberStore, rechercheParThematique, rechercheParSelection],
  ([$store]): RessourcesCyberFiltrees => {
    const resultat = $store.filter(
      (ressourceCyber: RessourceCyber) =>
        rechercheParThematique.ok(ressourceCyber) &&
        rechercheParSelection.ok(ressourceCyber)
    );

    const thematiques = lesThematiquesCyber($store);
    const selections = lesSelectionsDesRessourcesCyber($store);

    return { resultat, thematiques, selections };
  }
);
