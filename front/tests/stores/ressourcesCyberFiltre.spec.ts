import { get } from 'svelte/store';
import { beforeAll, describe, expect, it } from 'vitest';
import { ressourcesCyberStore } from '../../src/stores/ressourcesCyber.store';
import { ressourcesCyberFiltre } from '../../src/stores/ressourcesCyberFiltre.store';

describe('Le store qui contient la liste des ressources Cyber', () => {
  beforeAll(() => {
    ressourcesCyberStore.initialise([
      {
        id: 1,
        titre: 'Ressource 1',
        thematiques: [
          'Techniques de sécurité numérique',
          'Valoriser les talents féminins',
          'Orientation',
        ],
      },
      {
        id: 2,
        titre: 'Ressource 2',
        thematiques: ['Comportements numériques', 'Orientation'],
      },
    ]);
  });

  it('retourne la liste dédupliquée des thématiques existants', () => {
    const thematiquesAttendus = [
      'Comportements numériques',
      'Orientation',
      'Techniques de sécurité numérique',
      'Valoriser les talents féminins',
    ];

    const resultat = get(ressourcesCyberFiltre).thematiques;

    expect(resultat).toEqual(thematiquesAttendus);
  });
});
