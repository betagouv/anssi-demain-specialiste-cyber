import { RessourceCyber } from './ressourceCyber';

export interface EntrepotRessourcesCyber {
  tous: () => Promise<RessourceCyber[]>;
}
