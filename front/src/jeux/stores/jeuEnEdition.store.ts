import { writable } from 'svelte/store';
import type { JeuEnEdition } from '../jeuEnEdition.type';

export const jeuEnEditionStore = writable<JeuEnEdition>({});
