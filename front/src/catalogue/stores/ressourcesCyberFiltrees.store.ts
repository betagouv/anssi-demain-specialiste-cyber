import { derived } from 'svelte/store';
import {
  lesNiveauxDesRessourcesCyber,
  lesPublicsCibleDesRessourcesCyber,
  lesThematiquesCyber,
  lesTypesDesRessourcesCyber,
  type RessourceCyber,
} from '../ressourceCyber';
import { rechercheParBesoin } from './rechercheParBesoin.store';
import { rechercheParNiveau } from './rechercheParNiveau.store';
import { rechercheParPublicCible } from './rechercheParPublicCible.store';
import { rechercheParThematique } from './rechercheParThematique.store';
import { rechercheParType } from './rechercheParType.store';
import { rechercheTextuelle } from './rechercheTextuelle.store';
import { ressourcesCyberStore } from './ressourcesCyber.store';

export type RessourcesCyberFiltrees = {
  resultat: RessourceCyber[];
  thematiques: string[];
  publicsCible: string[];
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
    rechercheParPublicCible,
    rechercheParNiveau,
    rechercheParType,
    rechercheParBesoin,
    rechercheTextuelle,
  ],
  ([$store]): RessourcesCyberFiltrees => {
    const resultat = $store.filter(
      (ressourceCyber: RessourceCyber) =>
        rechercheParThematique.ok(ressourceCyber) &&
        rechercheParPublicCible.ok(ressourceCyber) &&
        rechercheParNiveau.ok(ressourceCyber) &&
        rechercheParType.ok(ressourceCyber) &&
        rechercheParBesoin.ok(ressourceCyber) &&
        rechercheTextuelle.ok(ressourceCyber),
    );

    const thematiques = lesThematiquesCyber($store);
    const publicsCible = lesPublicsCibleDesRessourcesCyber($store);
    const niveaux = lesNiveauxDesRessourcesCyber($store);
    const types = lesTypesDesRessourcesCyber($store);

    return { resultat, thematiques, publicsCible, niveaux, types, besoins };
  },
);
