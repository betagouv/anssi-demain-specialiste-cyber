import { CategorieDeJeux } from '../metier/referentiels/categorieDeJeux';
import { Classe } from '../metier/referentiels/classes';
import { Discipline } from '../metier/referentiels/disciplines';
import { Sequence } from '../metier/referentiels/sequence';
import { ThematiqueDeJeux } from '../metier/referentiels/thematiqueDeJeux';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { adaptateurJournalPostgres } from './adaptateurJournalPostgres';

export type DonneesEvenement =
  | DonneesEvenementNouvelUtilisateur
  | DonneesEvenementJeuCree;

type DonneesCommunesEvenement = {
  date: Date;
};

type DonneesEvenementNouvelUtilisateur = DonneesCommunesEvenement & {
  donnees: {
    idUtilisateur: string;
  };
  type: 'NOUVEL_UTILISATEUR_INSCRIT';
};

type DonneesEvenementJeuCree = DonneesCommunesEvenement & {
  donnees: {
    idUtilisateur: string;
    nom: string;
    sequence: Sequence;
    nomEtablissement: string;
    classe: Classe;
    discipline: Discipline;
    nombreEleves: number;
    categorie: CategorieDeJeux;
    thematiques: ThematiqueDeJeux[];
    nombreTemoignages: number;
  };
  type: 'JEU_CREE';
};

export type AdaptateurJournal = {
  consigneEvenement: (donneesEvenement: DonneesEvenement) => Promise<void>;
};

export const adaptateurJournalMemoire: AdaptateurJournal = {
  async consigneEvenement(donneesEvenement: DonneesEvenement): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(
      `[JOURNAL DSC] Nouvel évènement \n${JSON.stringify(donneesEvenement)}`,
    );
  },
};

export const fabriqueAdaptateurJournal = () => {
  return adaptateurEnvironnement.journal().enMemoire()
    ? adaptateurJournalMemoire
    : adaptateurJournalPostgres();
};
