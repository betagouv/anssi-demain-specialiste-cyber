import { get, writable } from 'svelte/store';
import type { RessourceCyber } from '../ressourceCyber';

const publicsCible = writable<string[]>([]);

export const rechercheParPublicCible = {
  subscribe: publicsCible.subscribe,
  set: publicsCible.set,
  reinitialise: () => publicsCible.set([]),
  ok: (ressourcesCyber: RessourceCyber) => {
    const valeurFiltre = get(publicsCible);
    return (
      !valeurFiltre.length ||
      ressourcesCyber.publicsCible.some((s) => valeurFiltre.includes(s))
    );
  },
};
