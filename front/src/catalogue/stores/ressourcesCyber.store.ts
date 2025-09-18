import { writable } from 'svelte/store';
import type { RessourceCyber } from '../ressourceCyber';

const { subscribe, set } = writable<RessourceCyber[]>([]);

export const ressourcesCyberStore = {
  subscribe,
  initialise: (ressourcesCyber: RessourceCyber[]) => {
    set([...ressourcesCyber]);
  },
};
