import { writable } from 'svelte/store';
import type { FamilleMetier } from '../familleMetier.type';

const { subscribe, set } = writable<FamilleMetier[]>([]);

export const famillesMetierStore = {
  subscribe,
  initialise: (familles: FamilleMetier[]) => {
    set([...familles]);
  },
};
