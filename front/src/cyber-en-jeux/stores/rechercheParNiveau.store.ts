import { get, writable } from 'svelte/store';
import type { Jeu, Niveau } from '../../jeu.type';

const niveaux = writable<Niveau[]>([]);

export const rechercheParNiveau = {
  subscribe: niveaux.subscribe,
  set: niveaux.set,
  reinitialise: () => niveaux.set([]),
  ok: (jeu: Jeu) => !get(niveaux).length || get(niveaux).includes(jeu.niveau),
};
