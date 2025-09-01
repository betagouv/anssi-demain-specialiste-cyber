import { get, writable } from 'svelte/store';
import type { RessourceCyber } from '../ressourceCyber';

const selectionThematiques = writable<string>('');

export const rechercheParThematique = {
  subscribe: selectionThematiques.subscribe,
  set: selectionThematiques.set,
  reinitialise: () => selectionThematiques.set(''),
  ok: (ressourceCyber: RessourceCyber) => {
    const thematique = get(selectionThematiques);
    return !thematique || ressourceCyber.thematiques.includes(thematique);
  },
};
