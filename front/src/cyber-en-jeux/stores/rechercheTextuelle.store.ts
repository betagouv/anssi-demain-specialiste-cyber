import { get, writable } from 'svelte/store';
import type { Jeu } from '../../jeu.type';

const store = writable<string>('');

export const rechercheTextuelle = {
  subscribe: store.subscribe,
  set: store.set,
  ok: (jeu: Jeu) =>
    contientLaRechercheSansDiacritique(jeu.nom, get(store)) ||
    contientLaRechercheSansDiacritique(jeu.description, get(store)),
};

function contientLaRechercheSansDiacritique(a: string, b: string): boolean {
  const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return normalize(a.toLowerCase()).includes(normalize(b.toLowerCase()));
}
