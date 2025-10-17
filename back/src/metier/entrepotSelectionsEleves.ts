import { Selection } from './selection';

export interface EntrepotSelectionsEleves {
  tous: () => Promise<Selection[]>;
}
