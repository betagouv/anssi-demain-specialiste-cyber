import { describe, expect, it } from 'vitest';
import {
  fauxAdaptateurEnvironnement,
  fauxAdaptateurHachage,
} from '../api/fauxObjets';
import { fabriqueServiceVerificationCoherenceSecretsHachage } from '../../src/infra/serviceVerificationCoherenceSecretsHachage';
import { EntrepotSecretHachage } from '../../src/infra/entrepotSecretHachagePostgres';
import { AdaptateurHachage } from '../../src/infra/adaptateurHachage';

describe('Le service de vérification de la cohérence des secrets de hachage', () => {
  it('jette une erreur si un secret est invalide', async () => {
    const adaptateurEnvironnement = {
      ...fauxAdaptateurEnvironnement,
      hachage: () => ({
        tousLesSecretsDeHachage: () => [
          { version: 1, secret: 'unAutreSecret' },
        ],
      }),
    };
    const entrepotSecretHachage: EntrepotSecretHachage = {
      tous: async () => [{ version: 1, empreinte: 'secret-crypte' }],
    };
    const adaptateurHachage: AdaptateurHachage = {
      ...fauxAdaptateurHachage,
      compareBCrypt: async () => false,
    };

    const service = fabriqueServiceVerificationCoherenceSecretsHachage({
      adaptateurHachage,
      entrepotSecretHachage,
      adaptateurEnvironnement,
    });

    await expect(() => service.verifieCoherenceSecrets()).rejects.toThrow(
      '💥 La version 1 du secret de la config a une valeur différente de celle déjà appliquée.'
    );
  });

  it("jette une erreur si le deuxième secret est invalide, peu importe l'ordre", async () => {
    const adaptateurEnvironnement = {
      ...fauxAdaptateurEnvironnement,
      hachage: () => ({
        tousLesSecretsDeHachage: () => [
          { version: 2, secret: 'unAutresecret' },
          { version: 1, secret: 'secret' },
        ],
      }),
    };
    const entrepotSecretHachage: EntrepotSecretHachage = {
      tous: async () => [
        { version: 1, empreinte: 'secret-crypte' },
        { version: 2, empreinte: 'secret2-crypte' },
      ],
    };
    const adaptateurHachage: AdaptateurHachage = {
      ...fauxAdaptateurHachage,
      compareBCrypt: async (secretEnClair) => secretEnClair !== 'unAutresecret',
    };

    const service = fabriqueServiceVerificationCoherenceSecretsHachage({
      adaptateurHachage,
      entrepotSecretHachage,
      adaptateurEnvironnement,
    });

    await expect(() => service.verifieCoherenceSecrets()).rejects.toThrow(
      '💥 La version 2 du secret de la config a une valeur différente de celle déjà appliquée.'
    );
  });

  it('ne fait rien si tous les secrets sont valides', async () => {
    const adaptateurEnvironnement = {
      ...fauxAdaptateurEnvironnement,
      hachage: () => ({
        tousLesSecretsDeHachage: () => [
          { version: 1, secret: 'secret' },
          { version: 2, secret: 'secret2' },
        ],
      }),
    };
    const entrepotSecretHachage: EntrepotSecretHachage = {
      tous: async () => [
        { version: 1, empreinte: 'secret-crypte' },
        { version: 2, empreinte: 'secret2-crypte' },
      ],
    };
    const adaptateurHachage: AdaptateurHachage = {
      ...fauxAdaptateurHachage,
      compareBCrypt: async () => true,
    };

    const service = fabriqueServiceVerificationCoherenceSecretsHachage({
      adaptateurHachage,
      entrepotSecretHachage,
      adaptateurEnvironnement,
    });

    await expect(service.verifieCoherenceSecrets()).resolves.toBeUndefined();
  });

  it("jette une erreur si un secret n'est pas présent dans la persistance", async () => {
    const adaptateurEnvironnement = {
      ...fauxAdaptateurEnvironnement,
      hachage: () => ({
        tousLesSecretsDeHachage: () => [
          { version: 1, secret: 'secret' },
          { version: 2, secret: 'secret2' },
        ],
      }),
    };
    const entrepotSecretHachage: EntrepotSecretHachage = {
      tous: async () => [{ version: 2, empreinte: 'secret2-crypte' }],
    };
    const adaptateurHachage: AdaptateurHachage = {
      ...fauxAdaptateurHachage,
      compareBCrypt: async () => true,
    };

    const service = fabriqueServiceVerificationCoherenceSecretsHachage({
      adaptateurHachage,
      entrepotSecretHachage,
      adaptateurEnvironnement,
    });

    await expect(() => service.verifieCoherenceSecrets()).rejects.toThrow(
      '💥 La version 1 du secret noté dans la config est manquante dans la persistance.'
    );
  });

  it("jette une erreur si un secret de la persistance n'est pas présent dans la config", async () => {
    const adaptateurEnvironnement = {
      ...fauxAdaptateurEnvironnement,
      hachage: () => ({
        tousLesSecretsDeHachage: () => [{ version: 2, secret: 'secret2' }],
      }),
    };
    const entrepotSecretHachage: EntrepotSecretHachage = {
      tous: async () => [
        { version: 2, empreinte: 'secret2-crypte' },
        { version: 1, empreinte: 'secret-crypte' },
      ],
    };
    const adaptateurHachage: AdaptateurHachage = {
      ...fauxAdaptateurHachage,
      compareBCrypt: async () => true,
    };

    const service = fabriqueServiceVerificationCoherenceSecretsHachage({
      adaptateurHachage,
      entrepotSecretHachage,
      adaptateurEnvironnement,
    });

    await expect(() => service.verifieCoherenceSecrets()).rejects.toThrow(
      '💥 La version 1 du secret déjà appliquée est manquante dans la config.'
    );
  });

  it("jette une erreur si aucun secret n'est présent dans la config", async () => {
    const adaptateurEnvironnement = {
      ...fauxAdaptateurEnvironnement,
      hachage: () => ({
        tousLesSecretsDeHachage: () => [],
      }),
    };

    const entrepotSecretHachage: EntrepotSecretHachage = {
      tous: async () => [],
    };

    const service = fabriqueServiceVerificationCoherenceSecretsHachage({
      adaptateurHachage: fauxAdaptateurHachage,
      entrepotSecretHachage,
      adaptateurEnvironnement,
    });

    await expect(() => service.verifieCoherenceSecrets()).rejects.toThrow(
      '💥 Aucun secret de hachage dans la config.'
    );
  });
});
