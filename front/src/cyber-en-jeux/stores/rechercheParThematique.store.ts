import { get, writable } from 'svelte/store';
import type { Thematique } from '../../jeu.type';
import type { Jeu } from '../jeu';

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
