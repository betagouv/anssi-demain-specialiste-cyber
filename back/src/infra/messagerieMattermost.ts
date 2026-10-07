import axios from 'axios';
import {
  MessagerieInstantanee,
  RetourEvaluation,
} from '../metier/messagerieInstantanee';

export const messagerieMattermost = (): MessagerieInstantanee => ({
  notifieUnRetourEvaluation: async (retourExperience: RetourEvaluation) => {
    const urlWebhook = process.env.WEBHOOK_MATTERMOST_RETOURS_EXPERIENCE;
    if (urlWebhook) {
      const message = `### Évaluation Cyber Enjeux
Un•e enseignant•e a ajouté des précisions sur l‘évaluation du jeu lors de son dépôt
Nom du jeu : ${retourExperience.nomJeu}
Précisions : ${retourExperience.precisions}`;

      await axios.post(urlWebhook, { text: message });
    }
  },
});
