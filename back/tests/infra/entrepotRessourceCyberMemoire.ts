import { EntrepotRessourcesCyber } from '../../src/metier/entrepotRessourcesCyber';

export const entrepotRessourcesCyberMemoire: EntrepotRessourcesCyber = {
  tous: async () => [
    {
      id: 'mon-id-ressource',
      titre: 'ressource 1',
    },
  ],
};
