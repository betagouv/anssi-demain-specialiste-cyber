import { Utilisateur } from '../../src/metier/utilisateur';
import { unJeu } from '../metier/constructeurJeu';

export const jeanneDupont = new Utilisateur({
  email: 'jeanne.dupont@mail.com',
  infolettreAcceptee: true,
  prenom: 'Jeanne',
  nom: 'Dupont',
  siretEntite: '',
});

export const cybercluedo = unJeu()
  .avecUnId('1')
  .avecUnNom('cybercluedo')
  .deEnseignant(jeanneDupont)
  .deClasse('cp')
  .deCategorie('simulation')
  .avecLesThematiques(['menace-cyber', 'orientation'])
  .avecUneDescription('Une description')
  .pourLaDiscipline('histoire-et-geographie')
  .dansEtablissement('Lycée de la mer')
  .avecUneCouverture('un-chemin')
  .construis();
