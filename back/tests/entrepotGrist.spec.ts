import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../src/infra/clientHttp';
import { EntrepotGrist, ReponseGrist } from '../src/infra/entrepotGrist';
import { FournisseurHorlogeDeTest } from './infra/fournisseurHorlogeDeTest';
import { FournisseurHorloge } from '../src/infra/FournisseurHorloge';

class EntrepotGristGenerique extends EntrepotGrist<{ test: string }> {
  async tous(): Promise<{ test: string }[]> {
    const resultat = await this.appelleGrist();
    return resultat.records;
  }

  async avecFiltre(filtre: number): Promise<{ test: string }[]> {
    const resultat = await this.appelleGrist({ id: [filtre] });
    return resultat.records;
  }
}
describe("L'entrepôt Grist générique", () => {
  const add = (date: Date, duration: { hours: number }) => {
    return new Date(date.getTime() + duration.hours * 3600000);
  };

  const ilSePasse2Heures = (): void => {
    FournisseurHorlogeDeTest.initialise(
      add(FournisseurHorloge.maintenant(), { hours: 2 }),
    );
  };

  it('mets en cache le résultat de l’appel à Grist', async () => {
    let nombreAppel = 0;
    const clientHttp: RecupereRessourceHttp<
      ReponseGrist<{ test: string }>
    > = async (_url: string) => {
      nombreAppel++;
      return { records: [{ test: 'une chaine' }] };
    };
    const entrepotRessourcesCyberGrist = new EntrepotGristGenerique(
      clientHttp,
      'schema',
      'table',
    );

    await entrepotRessourcesCyberGrist.tous();
    const resultat = await entrepotRessourcesCyberGrist.tous();

    expect(nombreAppel).toEqual(1);
    expect(resultat).toStrictEqual([{ test: 'une chaine' }]);
  });

  it("mets en cache les résultats d'appels à Grist avec des filtres différents", async () => {
    const clientHttp: RecupereRessourceHttp<
      ReponseGrist<{ test: string }>
    > = async (url: string) => {
      return { records: [{ test: 'une chaine de ' + url }] };
    };
    const entrepotRessourcesCyberGrist = new EntrepotGristGenerique(
      clientHttp,
      'schema',
      'table',
    );

    const premier = await entrepotRessourcesCyberGrist.avecFiltre(1);
    const second = await entrepotRessourcesCyberGrist.avecFiltre(2);

    expect(premier).not.toEqual(second);
  });

  it("retourne la valeur précédente en cas d'erreur Grist", async () => {
    let i = 0;
    const clientHttp: RecupereRessourceHttp<
      ReponseGrist<{ test: string }>
    > = async (_url: string) => {
      if (i === 0) {
        i++;
        return { records: [{ test: 'une chaine' }] };
      }
      return Promise.reject(new Error('Erreur 404'));
    };

    const entrepotRessourcesCyberGrist = new EntrepotGristGenerique(
      clientHttp,
      'urlDeBase',
      'cleApi',
    );
    await entrepotRessourcesCyberGrist.tous();
    ilSePasse2Heures();

    const resultat = await entrepotRessourcesCyberGrist.tous();

    expect(resultat).toEqual([{ test: 'une chaine' }]);
  });
});
