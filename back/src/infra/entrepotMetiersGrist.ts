import { EntrepotMetiers } from '../metier/entrepotMetiers';
import { Metier } from '../metier/metier';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { creeRecupereRessourceHttp, RecupereRessourceHttp } from './clientHttp';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';

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

  async tous(): Promise<Metier[]> {
    const réponse = await this.appelleGrist();
    return réponse.records.map((mg) => this.reconstitueMétier(mg));
  }

  async parIdentifiant(identifiant: number): Promise<Metier | undefined> {
    const reponse = await this.appelleGrist({ Id_Metier: [identifiant] });
    if (!reponse.records || reponse.records.length === 0) {
      return undefined;
    }
    return this.reconstitueMétier(reponse.records[0]);
  }

  private reconstitueMétier = (metierGrist: MetierGrist) => ({
    id: metierGrist.id,
    titre: metierGrist.fields.Titre_de_la_fiche,
    fonction: metierGrist.fields.Fonction_de_la_fiche,
    description: metierGrist.fields.En_quoi_consiste_le_metier_,
    missionPrincipale: metierGrist.fields.Mission_principale,
    postures: this.aseptiseListe(metierGrist.fields.Postures),
    formationsCibles: this.aseptiseListe(metierGrist.fields.Formation_cible),
    preRequis: this.aseptiseListe(metierGrist.fields.Autre_prerequis_possibles),
    remuneration: {
      junior: metierGrist.fields.Salaire_junior_annuel_brut_,
      senior: metierGrist.fields.Salaire_senior_annuel_brut_,
    },
    metiersProches: this.aseptiseListe(metierGrist.fields.Metiers_proches),
    liens: {
      illustration: metierGrist.fields.URL_illustration,
      dataemploi: metierGrist.fields.Fiche_data_emploi,
      metierscope: metierGrist.fields.Fiche_metierscope,
      videos: metierGrist.fields.lien_video
        .split('\n')
        .filter((url) => url.trim()),
    },
  });

  async ajoute(_metier: Metier): Promise<void> {
    throw new Error('Pas supporté');
  }
}
