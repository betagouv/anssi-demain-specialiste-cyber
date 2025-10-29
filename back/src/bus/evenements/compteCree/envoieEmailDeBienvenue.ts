import { ExpediteurEmail } from '../../../metier/expediteurEmail';
import { CompteCree } from './compteCree';

export const envoieEmailDeBienvenue = ({
  expediteurEmail,
}: {
  expediteurEmail: ExpediteurEmail;
}) => {
  return async function ({ email, prenom }: CompteCree) {
    await expediteurEmail.envoieEmailBienvenue({
      email,
      prenom,
    });
  };
};
