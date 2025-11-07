import axios from 'axios';
import { writable } from 'svelte/store';

type Profil = {
  email: string;
};

const { subscribe, set } = writable<Profil | undefined>();

axios
  .get('/api/profil')
  .then((reponse) => {
    if (reponse.data.email) {
      set({ email: reponse.data.email });
    }
  })
  .catch(() => set(undefined));

export const profil = {
  subscribe,
};
