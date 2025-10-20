import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../src/infra/recupereRessourceHttp';
import { EntrepotGrist, ReponseGrist } from '../src/infra/entrepotGrist';

class EntrepotGristGenerique extends EntrepotGrist<{ test: string }> {
  async tous(): Promise<{ test: string }[]> {
    const resultat = await this.appelleGrist();
    return resultat.records;
  }
}

describe("L'entrepôt Grist générique", () => {
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
});
