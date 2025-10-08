import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { adaptateurEnvironnement } from '../../src/infra/adaptateurEnvironnement';

describe("L'adaptateur environnement", () => {
  let envActuel: NodeJS.ProcessEnv;

  beforeEach(() => {
    envActuel = process.env;
  });

  afterEach(() => {
    process.env = envActuel;
  });

  it('sait charger les secrets', async () => {
    process.env = {
      HACHAGE_SECRET_DE_HACHAGE_1: 'secret1',
      HACHAGE_SECRET_DE_HACHAGE_2: 'secret2',
    };

    const tousLesSecretsDeHachage = adaptateurEnvironnement
      .hachage()
      .tousLesSecretsDeHachage();

    expect(tousLesSecretsDeHachage).toStrictEqual([
      { version: 1, secret: 'secret1' },
      { version: 2, secret: 'secret2' },
    ]);
  });

  it('charge les secrets dans le bon ordre', async () => {
    process.env = {
      HACHAGE_SECRET_DE_HACHAGE_1: 'secret1',
      HACHAGE_SECRET_DE_HACHAGE_3: 'secret3',
      HACHAGE_SECRET_DE_HACHAGE_2: 'secret2',
    };

    const tousLesSecretsDeHachage = adaptateurEnvironnement
      .hachage()
      .tousLesSecretsDeHachage();

    expect(tousLesSecretsDeHachage).toStrictEqual([
      { version: 1, secret: 'secret1' },
      { version: 2, secret: 'secret2' },
      { version: 3, secret: 'secret3' },
    ]);
  });

  it('ne charge pas les secrets qui ne correspondent pas au format indiqué', async () => {
    process.env = {
      HACHAGE_SECRET_DE_HACHAGE_1: 'secret1',
      HACHAGE_SECRET_DE_HACHAGE_V3: 'secret3',
      HACHAGE_SECRET_DE_HACHAGE_2: 'secret2',
    };

    const tousLesSecretsDeHachage = adaptateurEnvironnement
      .hachage()
      .tousLesSecretsDeHachage();

    expect(tousLesSecretsDeHachage).toStrictEqual([
      { version: 1, secret: 'secret1' },
      { version: 2, secret: 'secret2' },
    ]);
  });

  it('utilise des entiers pour les versions', () => {
    process.env = { HACHAGE_SECRET_DE_HACHAGE_1: 'secret1' };

    const tousLesSecretsDeHachage = adaptateurEnvironnement
      .hachage()
      .tousLesSecretsDeHachage();

    expect(tousLesSecretsDeHachage[0].version).toBe(1);
  });

  it('lance une exception si un secret est vide', async () => {
    process.env = {
      HACHAGE_SECRET_DE_HACHAGE_1: '',
    };

    expect(() => {
      adaptateurEnvironnement.hachage().tousLesSecretsDeHachage();
    }).toThrow(
      `Le secret de hachage HACHAGE_SECRET_DE_HACHAGE_1 ne doit pas être vide`,
    );
  });

  it('ignore les clés qui ne concernent pas le hachage', () => {
    process.env = {
      URL_BASE: '',
      HACHAGE_SECRET_DE_HACHAGE_1: 'ok',
    };

    const secrets = adaptateurEnvironnement.hachage().tousLesSecretsDeHachage();

    expect(secrets).toHaveLength(1);
  });

  it("sait construire l'URL des PhotosJeux du cellar", () => {
    process.env = {
      S3_URL_CELLAR: 'https://lurl-du-cellar',
      S3_BUCKET_PHOTOS_JEUX: 'bucket-photos-jeux',
    };
    const cellarPhotosJeux = adaptateurEnvironnement.cellarPhotosJeux();

    expect(cellarPhotosJeux).toEqual(
      'https://bucket-photos-jeux.lurl-du-cellar',
    );
  });
});
