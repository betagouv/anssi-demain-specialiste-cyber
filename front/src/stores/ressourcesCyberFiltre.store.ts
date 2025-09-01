import { derived } from 'svelte/store';
import { lesThematiquesCyber, type RessourceCyber } from '../ressourceCyber';
import { rechercheParThematique } from './rechercheParThematique.store';
import { ressourcesCyberStore } from './ressourcesCyber.store';

export const ressourcesCyberFiltre = derived(
  [ressourcesCyberStore, rechercheParThematique],
  ([$store]) => {
    const resultat = $store.filter((ressourceCyber: RessourceCyber) =>
      rechercheParThematique.ok(ressourceCyber)
    );

    const thematiques = lesThematiquesCyber($store);

    return { resultat, thematiques };
  }
);
