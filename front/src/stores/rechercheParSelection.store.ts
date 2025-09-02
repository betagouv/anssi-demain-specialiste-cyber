import { get, writable } from 'svelte/store';
import type { RessourceCyber } from '../ressourceCyber';

const selections = writable<string[]>([]);

export const rechercheParSelection = {
  subscribe: selections.subscribe,
  set: selections.set,
  reinitialise: () => selections.set([]),
  ok: (ressourcesCyber: RessourceCyber) => {
    const selection = get(selections);
    return (
      !selection.length ||
      ressourcesCyber.selections.some((s) => selection.includes(s))
    );
  },
};
