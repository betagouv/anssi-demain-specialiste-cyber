import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';
import { extracteurErreursZod } from '../../src/jeux/validateur';

describe("L'extracteur d'erreur zod", () => {
  type MonType = {
    champBool: boolean;
    champText: string;
    champNumeric: number;
  };

  it("retourne un objet vide si il n'y a pas d'erreur", () => {
    const erreursZod: ZodError<MonType>['issues'] = [];
    expect(extracteurErreursZod<MonType>(erreursZod)).toEqual({});
  });

  it("retourne un objet avec le champ en erreur en clé, et le message d'erreur en valeur", () => {
    const erreursZod: ZodError<MonType>['issues'] = [
      {
        path: ['champBool'],
        code: 'invalid_type',
        message: 'Invalid input: expected boolean',
        expected: 'boolean',
      },
      {
        path: ['champNumeric'],
        code: 'invalid_type',
        message: 'Invalid input: expected number',
        expected: 'number',
      },
    ];
    expect(extracteurErreursZod<MonType>(erreursZod)).toEqual({
      champBool: 'Invalid input: expected boolean',
      champNumeric: 'Invalid input: expected number',
    });
  });
});
