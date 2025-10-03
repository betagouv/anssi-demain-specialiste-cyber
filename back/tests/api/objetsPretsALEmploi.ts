import { Jeu } from '../../src/metier/jeu';
import { Utilisateur } from '../../src/metier/utilisateur';

export const jeanneDupont = new Utilisateur({
  email: 'jeanne.dupont@mail.com',
  infolettreAcceptee: true,
  prenom: '',
  nom: '',
  siretEntite: '',
});

export const jeuDeJeanneDupont = new Jeu({
  id: '1',
  nom: 'cybercluedo',
  enseignant: jeanneDupont,
  sequence: 'heure',
  classe: 'cp',
  discipline: 'histoire-et-geographie',
  nomEtablissement: 'Lycée de la mer',
  eleves: [],
  categorie: 'simulation',
  thematiques: ['menace-cyber', 'orientation'],
  description: 'Une description',
});
