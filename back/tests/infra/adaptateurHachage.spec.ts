import { describe, expect, it } from 'vitest';
import { fabriqueAdaptateurHachage } from '../../src/infra/adaptateurHachage';
import { AdaptateurEnvironnement } from '../../src/infra/adaptateurEnvironnement';
import { fauxAdaptateurEnvironnement } from '../api/fauxObjets';

describe("L'adaptateur de hachage", () => {
  describe('sur demande de hachage HMAC', () => {
    it('hache avec un secret', async () => {
      const adaptateurEnvironnement: AdaptateurEnvironnement = {
        ...fauxAdaptateurEnvironnement,
        hachage: () => ({
          tousLesSecretsDeHachage: () => [{ version: 1, secret: 'chut' }],
        }),
      };

      const hache = fabriqueAdaptateurHachage({
        adaptateurEnvironnement,
      }).hache('7276abd6-98bb-4bc9-bd17-d50a56aba7e4');

      expect(hache).toBe(
        'v1:1cf9d6256a25545991bb031f1bbec7837b6e76b71e567acb83d88ee82dc07178'
      );
    });

    it('hache avec deux secrets', async () => {
      const adaptateurEnvironnement: AdaptateurEnvironnement = {
        ...fauxAdaptateurEnvironnement,
        hachage: () => ({
          tousLesSecretsDeHachage: () => [
            { version: 1, secret: 'chut' },
            { version: 2, secret: 'tais-toi' },
          ],
        }),
      };

      const hache = fabriqueAdaptateurHachage({
        adaptateurEnvironnement,
      }).hache('7276abd6-98bb-4bc9-bd17-d50a56aba7e4');

      expect(hache).toBe(
        'v1-v2:ddb368b08519541e0e9f7c910358facac8107c763672536da06b484cec18249b'
      );
    });

    it('si aucun ?', () => {
      const adaptateurEnvironnement: AdaptateurEnvironnement = {
        ...fauxAdaptateurEnvironnement,
        hachage: () => ({
          tousLesSecretsDeHachage: () => [],
        }),
      };

      const hache = fabriqueAdaptateurHachage({
        adaptateurEnvironnement,
      }).hache('7276abd6-98bb-4bc9-bd17-d50a56aba7e4');

      expect(hache).toBe(':7276abd6-98bb-4bc9-bd17-d50a56aba7e4');
    });
  });
});
