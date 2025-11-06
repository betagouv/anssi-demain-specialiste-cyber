import { EntrepotMetiers } from '../metier/entrepotMetiers';
import { Metier } from '../metier/metier';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';
import { creeRecupereRessourceHttp, RecupereRessourceHttp } from './clientHttp';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';

export type MetierGrist = {
  id: number;
  fields: {
    Titre_de_la_fiche: string;
    Fonction_de_la_fiche: string;
    En_quoi_consiste_le_metier_: string;
    Mission_principale: string;
    Metiers_proches: string[];
    Postures: string[];
    Fiche_data_emploi: string;
    Fiche_metierscope: string;
    Formation_cible: string[];
    Autre_prerequis_possibles: string[];
    Salaire_junior_annuel_brut_: number;
    Salaire_senior_annuel_brut_: number;
    lien_video: string;
    URL_illustration: string;
  };
};

export class EntrepotMetiersGrist
  extends EntrepotGrist<MetierGrist>
  implements EntrepotMetiers
{
  constructor(
    metierGrist: RecupereRessourceHttp<
      ReponseGrist<MetierGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    const grist = adaptateurEnvironnement.grist();
    super(metierGrist, grist.idDocument, grist.metiers().idTable);
  }

  async parIdentifiant(identifiant: number): Promise<Metier | undefined> {
    const reponse = await this.appelleGrist({ Id_Metier: [identifiant] });
    if (!reponse.records || reponse.records.length === 0) {
      return undefined;
    }
    const enregistrement = reponse.records[0];
    return {
      id: enregistrement.id,
      titre: enregistrement.fields.Titre_de_la_fiche,
      fonction: enregistrement.fields.Fonction_de_la_fiche,
      description: enregistrement.fields.En_quoi_consiste_le_metier_,
      missionPrincipale: enregistrement.fields.Mission_principale,
      postures: this.aseptiseListe(enregistrement.fields.Postures),
      formationsCibles: this.aseptiseListe(
        enregistrement.fields.Formation_cible,
      ),
      preRequis: this.aseptiseListe(
        enregistrement.fields.Autre_prerequis_possibles,
      ),
      remuneration: {
        junior: enregistrement.fields.Salaire_junior_annuel_brut_,
        senior: enregistrement.fields.Salaire_senior_annuel_brut_,
      },
      metiersProches: this.aseptiseListe(enregistrement.fields.Metiers_proches),
      liens: {
        illustration: enregistrement.fields.URL_illustration,
        dataemploi: enregistrement.fields.Fiche_data_emploi,
        metierscope: enregistrement.fields.Fiche_metierscope,
        videos: enregistrement.fields.lien_video
          .split('\n')
          .filter((url) => url.trim()),
      },
    };
  }

  async ajoute(_metier: Metier): Promise<void> {
    throw new Error('Pas supporté');
  }
}
