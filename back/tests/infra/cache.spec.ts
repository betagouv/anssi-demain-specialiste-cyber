import { describe, expect, it } from 'vitest';
import { FournisseurHorlogeDeTest } from './fournisseurHorlogeDeTest';
import { Cache } from '../../src/infra/cache';
import { add } from 'date-fns';
import { FournisseurHorloge } from '../../src/infra/FournisseurHorloge';

const _24_HEURES = 1440;

const ilSePasse25Heures = (): void => {
  FournisseurHorlogeDeTest.initialise(
    add(FournisseurHorloge.maintenant(), { hours: 25 }),
  );
};

describe('Le système de mise en cache', () => {
  it('exécute la fonction passée lorsqu’il n’y a pas de cache', () => {
    let ressourceAppelee = false;
    const cache = new Cache();

    cache.get('une-clef', () => {
      ressourceAppelee = true;
    });

    expect(ressourceAppelee).toBeTruthy();
  });

  it('n’exécute pas la fonction passée lorsqu’il y a du cache', () => {
    let ressourceAppelee = false;
    const cache = new Cache();

    cache.get('une-clef', () => {});
    cache.get('une-clef', () => {
      ressourceAppelee = true;
    });

    expect(ressourceAppelee).toBeFalsy();
  });

  it('retourne le résultat de la fonction exécutée', () => {
    const cache = new Cache<string>();
    const laFonction = () => {
      return 'une valeur';
    };

    const resultat = cache.get('une-clef', laFonction);

    expect(resultat).toBe('une valeur');
  });

  it('retourne la valeur mise en cache', () => {
    const cache = new Cache<string>();
    let compteur = 0;
    const laFonction = () => {
      return `une valeur_${compteur++}`;
    };

    cache.get('une-clef', laFonction);
    const resultat = cache.get('une-clef', laFonction);

    expect(resultat).toBe('une valeur_0');
  });

  it('effectue une mise en cache limitée dans le temps', () => {
    FournisseurHorlogeDeTest.initialise(new Date(Date.parse('2025/01/01')));
    const cache = new Cache<string>({ ttl: _24_HEURES });
    let compteur = 0;
    const laFonction = () => {
      return `une valeur_${compteur++}`;
    };

    cache.get('une-clef', laFonction);
    ilSePasse25Heures();
    const resultat = cache.get('une-clef', laFonction);

    expect(resultat).toBe('une valeur_1');
  });

  it('la nouvelle valeur après expiration est mise en cache', () => {
    FournisseurHorlogeDeTest.initialise(new Date(Date.parse('2025/01/01')));
    const cache = new Cache<string>({ ttl: _24_HEURES });
    let compteur = 0;
    const laFonction = () => {
      return `une valeur_${compteur++}`;
    };

    cache.get('une-clef', laFonction);
    ilSePasse25Heures();
    cache.get('une-clef', laFonction);
    const resultat = cache.get('une-clef', laFonction);

    expect(resultat).toBe('une valeur_1');
  });
});
