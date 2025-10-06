import { writable } from 'svelte/store';
import type { Jeu } from '../jeu';

const { subscribe, set } = writable<Jeu[]>([]);

export const jeuxStore = {
  subscribe,
  initialise: (jeux: Jeu[]) => {
    set([...jeux]);
  },
};
