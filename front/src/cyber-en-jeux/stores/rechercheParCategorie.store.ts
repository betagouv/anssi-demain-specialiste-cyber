import { get, writable } from 'svelte/store';
import type { Categorie } from '../../jeu.type';
import type { Jeu } from '../jeu';

const categorie = writable<Categorie | ''>('');

export const rechercheParCategorie = {
  subscribe: categorie.subscribe,
  set: categorie.set,
  reinitialise: () => categorie.set(''),
  ok: (jeu: Jeu) =>
    !get(categorie).length || get(categorie).includes(jeu.categorie),
};
