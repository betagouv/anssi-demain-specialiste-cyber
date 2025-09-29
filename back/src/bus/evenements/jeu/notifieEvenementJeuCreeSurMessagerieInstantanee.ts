import { MessagerieInstantanee } from '../../../metier/messagerieInstantanee';
import { JeuCree } from './jeuCree';
import { aseptiseVersMarkdown } from '../../../infra/markdown';

export const notifieEvenementJeuCreeSurMessagerieInstantanee = (
  messagerieInstantanee: MessagerieInstantanee,
): ((jeuCree: JeuCree) => Promise<void>) => {
  return async (jeuCree: JeuCree) => {
    if (!jeuCree.precisions) {
      return Promise.resolve();
    }
    return messagerieInstantanee.notifieUnRetourEvaluation({
      nomJeu: aseptiseVersMarkdown(jeuCree.nom),
      precisions: aseptiseVersMarkdown(jeuCree.precisions),
    });
  };
};
