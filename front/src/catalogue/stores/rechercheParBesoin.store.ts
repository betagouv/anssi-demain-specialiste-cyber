import { get, writable } from 'svelte/store';
import type { RessourceCyber } from '../ressourceCyber';

const besoin = writable<string>('');

export const rechercheParBesoin = {
  subscribe: besoin.subscribe,
  set: besoin.set,
  reinitialise: () => besoin.set(''),
  ok: (ressourceCyber: RessourceCyber) =>
    get(besoin) === '' || ressourceCyber.besoins.includes(get(besoin)),
};
