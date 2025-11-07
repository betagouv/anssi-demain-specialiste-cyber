import { get, writable } from 'svelte/store';
import type { Niveau } from '../../jeu.type';
import type { Jeu } from '../jeu';

const niveaux = writable<Niveau[]>([]);

export const rechercheParNiveau = {
  subscribe: niveaux.subscribe,
  set: niveaux.set,
  reinitialise: () => niveaux.set([]),
  ok: (jeu: Jeu) => !get(niveaux).length || get(niveaux).includes(jeu.niveau),
};
