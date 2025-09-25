import type { ZodError } from 'zod';

export interface Validateur<T> {
  estValide(t: T): boolean;
  valide(t: T): Partial<Record<keyof T, string>>;
}

export function extracteurErreursZod<T>(
  erreursZod: ZodError<T>['issues'],
): Partial<Record<keyof T, string>> {
  return erreursZod.reduce(
    (acc, current) => {
      const champ = current.path[0] as keyof T;

      acc[champ] = current.message;
      return acc;
    },
    {} as Partial<Record<keyof T, string>>,
  );
}
