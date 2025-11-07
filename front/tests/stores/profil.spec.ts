import { get } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { profil } from '../../src/stores/profil';

vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn().mockResolvedValue({
        data: { email: 'jeanne.dupond@mail.fr' },
      }),
    },
  };
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
