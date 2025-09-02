import { get, writable } from 'svelte/store';

type Profil = {
  email: string;
};

const { subscribe, set } = writable<Profil | undefined>();

fetch('/api/profil')
  .then((reponse) => reponse.json())
  .then((data) => {
    if (data.email) {
      set({ email: data.email });
    }
  })
  .catch(() => set(undefined));

export const profilStore = {
  subscribe,
  utilisateurEstConnecte: (): boolean => !!get(profilStore)?.email,
};
