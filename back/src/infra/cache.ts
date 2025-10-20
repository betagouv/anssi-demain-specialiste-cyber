import { add, isAfter } from 'date-fns';
import { FournisseurHorloge } from './FournisseurHorloge';

type EntreeDeCache<T> = {
  dateExpiration?: Date;
  valeur: T;
};

type Minutes = number;

export class Cache<T> {
  private readonly cache: Map<string, EntreeDeCache<T>> = new Map();

  constructor(private readonly configuration?: { ttl: Minutes }) {}

  get(clefCache: string, fonction: () => T) {
    if (this.cache.has(clefCache)) {
      const { valeur, dateExpiration } = this.cache.get(clefCache)!;
      if (
        dateExpiration &&
        isAfter(FournisseurHorloge.maintenant(), dateExpiration)
      ) {
        return this.metsEnCache(fonction, clefCache);
      }
      return valeur;
    }
    return this.metsEnCache(fonction, clefCache);
  }

  private metsEnCache(fonction: () => T, clefCache: string) {
    const resultat = fonction();
    this.cache.set(clefCache, {
      valeur: resultat,
      ...(this.configuration && {
        dateExpiration: add(FournisseurHorloge.maintenant(), {
          minutes: this.configuration.ttl,
        }),
      }),
    });
    return resultat;
  }
}
