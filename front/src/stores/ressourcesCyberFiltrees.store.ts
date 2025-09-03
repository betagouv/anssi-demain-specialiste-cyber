import { derived } from 'svelte/store';
import {
  lesNiveauxDesRessourcesCyber,
  lesSelectionsDesRessourcesCyber,
  lesThematiquesCyber,
  lesTypesDesRessourcesCyber,
  type RessourceCyber,
} from '../ressourceCyber';
import { rechercheParBesoin } from './rechercheParBesoin.store';
import { rechercheParNiveau } from './rechercheParNiveau.store';
import { rechercheParSelection } from './rechercheParSelection.store';
import { rechercheParThematique } from './rechercheParThematique.store';
import { rechercheParType } from './rechercheParType.store';
import { ressourcesCyberStore } from './ressourcesCyber.store';

export type RessourcesCyberFiltrees = {
  resultat: RessourceCyber[];
  thematiques: string[];
  selections: string[];
  niveaux: string[];
  types: string[];
  besoins: string[];
};

const besoins: string[] = [
  'Se protéger des risques',
  'Découvrir la cyber',
  'Découvrir les métiers',
  'Explorer les formations',
];

export const ressourcesCyberFiltrees = derived(
  [
    ressourcesCyberStore,
    rechercheParThematique,
    rechercheParSelection,
    rechercheParNiveau,
    rechercheParType,
    rechercheParBesoin,
  ],
  ([$store]): RessourcesCyberFiltrees => {
    const resultat = $store.filter(
      (ressourceCyber: RessourceCyber) =>
        rechercheParThematique.ok(ressourceCyber) &&
        rechercheParSelection.ok(ressourceCyber) &&
        rechercheParNiveau.ok(ressourceCyber) &&
        rechercheParType.ok(ressourceCyber) &&
        rechercheParBesoin.ok(ressourceCyber)
    );

    const thematiques = lesThematiquesCyber($store);
    const selections = lesSelectionsDesRessourcesCyber($store);
    const niveaux = lesNiveauxDesRessourcesCyber($store);
    const types = lesTypesDesRessourcesCyber($store);

    return { resultat, thematiques, selections, niveaux, types, besoins };
  }
);
