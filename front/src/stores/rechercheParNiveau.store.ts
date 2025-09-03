import { get, writable } from 'svelte/store';
import type { RessourceCyber } from '../ressourceCyber';

const niveaux = writable<string[]>([]);

export const rechercheParNiveau = {
  subscribe: niveaux.subscribe,
  set: niveaux.set,
  reinitialise: () => niveaux.set([]),
  ok: (ressourceCyber: RessourceCyber) =>
    ressourceCyber.niveaux.some(
      (niveau) => !get(niveaux).length || get(niveaux).includes(niveau)
    ),
};
