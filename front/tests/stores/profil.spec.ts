import { get } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { profil } from '../../src/stores/profil';

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
    const valeurProfil = get(profil);

    expect(valeurProfil?.email).toEqual('jeanne.dupond@mail.fr');
  });

  it("indique que l'utilisateur est connecté", async () => {
    expect(get(profil)).toBeTruthy();
  });
});
