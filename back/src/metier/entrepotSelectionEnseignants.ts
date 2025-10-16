import { Selection } from './selection';

export interface EntrepotSelectionEnseignants {
  tous: () => Promise<Selection[]>;
}
