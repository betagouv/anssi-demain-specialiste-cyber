import { writable } from 'svelte/store';
import type { JeuEnEdition } from '../jeu';

export const jeuEnEditionStore = writable<JeuEnEdition>({});
