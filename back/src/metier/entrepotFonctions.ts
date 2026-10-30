import { Fonction } from './fonction';

export interface EntrepôtFonctions {
  tous(): Promise<Fonction[]>;
}
