import { get, writable } from 'svelte/store';
import type { Jeu, Thematique } from '../jeu';

const selectionThematique = writable<Thematique | ''>('');

export const rechercheParThematique = {
  subscribe: selectionThematique.subscribe,
  set: selectionThematique.set,
  reinitialise: () => selectionThematique.set(''),
  ok: (jeu: Jeu) => {
    const thematique = get(selectionThematique);
    return !thematique || jeu.thematiques.includes(thematique);
  },
};
