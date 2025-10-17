import { Selection } from './selection';

export interface EntrepotSelections {
  tous: () => Promise<Selection[]>;
}
