import { ExpediteurEmail } from '../../../metier/expediteurEmail';
import { CompteCree } from './compteCree';

export const creeContactDansExpediteurEmail = ({
  expediteurEmail,
}: {
  expediteurEmail: ExpediteurEmail;
}) => {
  return async function ({
    email,
    nom,
    prenom,
    infolettreAcceptee,
  }: CompteCree) {
    await expediteurEmail.creeContact({
      email,
      nom,
      prenom,
      infolettreAcceptee,
    });
  };
};
