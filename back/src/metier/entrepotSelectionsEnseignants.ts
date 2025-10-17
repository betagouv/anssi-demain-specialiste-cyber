import { Selection } from './selection';

export interface EntrepotSelectionsEnseignants {
  tous: () => Promise<Selection[]>;
}
