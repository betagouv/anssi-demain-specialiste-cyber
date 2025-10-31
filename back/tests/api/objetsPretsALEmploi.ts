import { Utilisateur } from '../../src/metier/utilisateur';
import { unJeu } from '../metier/constructeurJeu';

export const jeanneDupont = new Utilisateur({
  email: 'jeanne.dupont@mail.com',
  infolettreAcceptee: true,
  prenom: 'Jeanne',
  nom: 'Dupont',
  siretEntite: '',
});

export const hectorDurant = new Utilisateur({
  email: 'hector.durant@mail.com',
  prenom: 'Hector',
  nom: 'Durant',
  siretEntite: '13000766900018',
  infolettreAcceptee: true,
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

export const cyberuno = unJeu()
  .avecUnId('4050fff7-0bd6-46d8-ad5f-2c5118eb4c53')
  .avecUnNom('cyberuno')
  .deEnseignant(jeanneDupont)
  .deClasse('ce1')
  .deCategorie('autre')
  .avecLesThematiques(['comportements-numeriques', 'cyberharcelement'])
  .avecUneDescription('Une description du cyber uno')
  .pourLaDiscipline('autre')
  .dansEtablissement('Lycée de la montagne')
  .avecUneCouverture('un-deuxieme-chemin')
  .construis();
