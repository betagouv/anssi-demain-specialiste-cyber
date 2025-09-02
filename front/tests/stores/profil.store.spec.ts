import { get } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { profilStore } from '../../src/stores/profil.store';

vi.hoisted(() => {
  const newFetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve({ email: 'jeanne.dupond@mail.fr' }),
  });
  vi.stubGlobal('fetch', newFetch);
});

describe('Le store du profil', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('récupère le profil et assigne sa valeur au store', async () => {
    const profil = get(profilStore);

    expect(profil?.email).toEqual('jeanne.dupond@mail.fr');
  });

  it("indique que l'utilisateur est connecté", async () => {
    expect(profilStore.utilisateurEstConnecte()).toBeTruthy();
  });
});
