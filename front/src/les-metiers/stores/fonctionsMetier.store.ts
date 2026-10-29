import { writable } from 'svelte/store';
import type { FonctionMetier } from '../fonctionMetier.type';

const { subscribe, set } = writable<FonctionMetier[]>([]);

export const fonctionsMetierStore = {
  subscribe,
  initialise: (fonctions: FonctionMetier[]) => {
    set([...fonctions]);
  },
};
