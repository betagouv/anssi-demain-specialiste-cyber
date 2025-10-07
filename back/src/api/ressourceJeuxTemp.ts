import { ConfigurationServeur } from './configurationServeur';
import { Router } from 'express';
import { Classe } from '../metier/referentiels/classes';

type Niveau =
  | 'Cycle 1 (PS-GS)'
  | 'Cycle 2 (CP-CE2)'
  | 'Cycle 3 (CM1-6e)'
  | 'Cycle 4 (5e-3e)'
  | 'Cycle Terminal (2-T)'
  | 'Post Bac';

const classeVersNiveau = (classe: Classe): Niveau => {
  switch (classe) {
    case 'maternelle':
      return 'Cycle 1 (PS-GS)';
    case 'cp':
    case 'ce1':
    case 'ce2':
      return 'Cycle 2 (CP-CE2)';
    case 'cm1':
    case 'cm2':
    case '6e':
      return 'Cycle 3 (CM1-6e)';
    case '5e':
    case '4e':
    case '3e':
      return 'Cycle 4 (5e-3e)';
    case 'seconde':
    case 'premiere':
    case 'terminale':
      return 'Cycle Terminal (2-T)';
    default:
      return 'Post Bac';
  }
};

export const ressourceJeuxTemp = ({ entrepotJeux }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (_requete, reponse) => {
    const tousLesJeux = await entrepotJeux.tous();

    return reponse.send(
      tousLesJeux.map((jeu) => {
        const { id, nom, description, classe, categorie, thematiques } = jeu;
        return {
          id,
          nom,
          description,
          niveau: classeVersNiveau(classe),
          categorie,
          thematiques,
        };
      }),
    );
  });

  return routeur;
};
