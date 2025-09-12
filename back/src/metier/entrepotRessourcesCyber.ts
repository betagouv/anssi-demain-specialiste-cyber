import { RessourceCyber } from './ressourceCyber';

export interface EntrepotRessourcesCyber {
  tous: () => Promise<RessourceCyber[]>;
  ajoute: (ressource: RessourceCyber) => Promise<void>;
}
