import { derived } from 'svelte/store';
import {
  lesNiveauxDesRessourcesCyber,
  lesSelectionsDesRessourcesCyber,
  lesThematiquesCyber,
  lesTypesDesRessourcesCyber,
  type RessourceCyber,
} from '../ressourceCyber';
import { rechercheParNiveau } from './rechercheParNiveau.store';
import { rechercheParSelection } from './rechercheParSelection.store';
import { rechercheParThematique } from './rechercheParThematique.store';
import { ressourcesCyberStore } from './ressourcesCyber.store';
import { rechercheParType } from './rechercheParType.store';

export type RessourcesCyberFiltrees = {
  resultat: RessourceCyber[];
  thematiques: string[];
  selections: string[];
  niveaux: string[];
  types: string[];
};

export const ressourcesCyberFiltrees = derived(
  [
    ressourcesCyberStore,
    rechercheParThematique,
    rechercheParSelection,
    rechercheParNiveau,
    rechercheParType,
  ],
  ([$store]): RessourcesCyberFiltrees => {
    const resultat = $store.filter(
      (ressourceCyber: RessourceCyber) =>
        rechercheParThematique.ok(ressourceCyber) &&
        rechercheParSelection.ok(ressourceCyber) &&
        rechercheParNiveau.ok(ressourceCyber) &&
        rechercheParType.ok(ressourceCyber)
    );

    const thematiques = lesThematiquesCyber($store);
    const selections = lesSelectionsDesRessourcesCyber($store);
    const niveaux = lesNiveauxDesRessourcesCyber($store);
    const types = lesTypesDesRessourcesCyber($store);

    return { resultat, thematiques, selections, niveaux, types };
  }
);
