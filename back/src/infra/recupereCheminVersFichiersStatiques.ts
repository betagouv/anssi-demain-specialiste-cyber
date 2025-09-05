import { join } from 'path';

export type RecupereCheminVersFichiersStatiques = () => string[];

export const recupereCheminVersFichiersStatiquesParDefaut: RecupereCheminVersFichiersStatiques =
  () => {
    return [
      join(process.cwd(), '../front/dist'),
      join(process.cwd(), '../front/statique'),
    ];
  };
