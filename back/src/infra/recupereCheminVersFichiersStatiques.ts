import { join } from 'path';

export type RecupereCheminVersFichiersStatiques = () => string;

export const recupereCheminVersFichiersStatiquesParDefaut: RecupereCheminVersFichiersStatiques =
  () => {
    return join(__dirname, '../../../front/dist');
  };
