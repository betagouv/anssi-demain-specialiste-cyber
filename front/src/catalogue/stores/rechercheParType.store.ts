import { get, writable } from 'svelte/store';
import type { RessourceCyber } from '../ressourceCyber';

const types = writable<string[]>([]);

export const rechercheParType = {
  subscribe: types.subscribe,
  set: types.set,
  reinitialise: () => types.set([]),
  ok: (ressourceCyber: RessourceCyber) =>
    ressourceCyber.types.some(
      (type) => !get(types).length || get(types).includes(type),
    ),
};
