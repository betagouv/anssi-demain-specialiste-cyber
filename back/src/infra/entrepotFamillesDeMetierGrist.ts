import { EntrepôtFamillesDeMétier } from '../metier/entrepotFamillesDeMetier';
import { EntrepotMetiers } from '../metier/entrepotMetiers';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { FamilleDeMétier } from '../metier/familleDeMetier';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { creeRecupereRessourceHttp, RecupereRessourceHttp } from './clientHttp';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';

export type FamilleDeMetierGrist = {
  fields: {
    Famille: string;
    Titre_Hero: string;
    Sous_texte_Hero: string;
    En_bref: string;
    Tuile_1: string;
    Tuile_2: string;
    Tuile_3: string;
    Profils_de_cette_famille: number[];
    Ressources_associees: number[];
  };
};

export class EntrepôtFamillesDeMétierGrist
  extends EntrepotGrist<FamilleDeMetierGrist>
  implements EntrepôtFamillesDeMétier
{
  private entrepôtMétiers: EntrepotMetiers;

  constructor(
    entrepôtMétiers: EntrepotMetiers,
    entrepôtRessourcesCyber: EntrepotRessourcesCyber,
    famillesDeMetierGrist: RecupereRessourceHttp<
      ReponseGrist<FamilleDeMetierGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    super(
      famillesDeMetierGrist,
      adaptateurEnvironnement.grist().idDocument,
      adaptateurEnvironnement.grist().famillesDeMétier().idTable,
    );
    this.entrepôtRessourcesCyber = entrepôtRessourcesCyber;
    this.entrepôtMétiers = entrepôtMétiers;
  }

  async tous(): Promise<FamilleDeMétier[]> {
    const métiers = await this.entrepôtMétiers.tous();
    const ressourcesCyber = await this.entrepôtRessourcesCyber.tous();

    const réponse = await this.appelleGrist();
    return réponse.records.map(
      (familleGrist) =>
        new FamilleDeMétier({
          code: familleGrist.fields.Famille,
          titre: familleGrist.fields.Titre_Hero,
          sousTitre: familleGrist.fields.Sous_texte_Hero,
          description: familleGrist.fields.En_bref,
          rôles: [
            this.champEnRôle(familleGrist.fields.Tuile_1),
            this.champEnRôle(familleGrist.fields.Tuile_2),
            this.champEnRôle(familleGrist.fields.Tuile_3),
          ],
          profils: this.aseptiseListe(
            familleGrist.fields.Profils_de_cette_famille,
          )
            .map((profil) => métiers.find((m) => m.id === profil))
            .filter((m) => m !== undefined),
          ressourcesAssociées: this.aseptiseListe(
            familleGrist.fields.Ressources_associees,
          )
            .map((r) => ressourcesCyber.find((ressource) => ressource.id === r))
            .filter((r) => r !== undefined),
        }),
    );
  }
  private champEnRôle = (champ: string) => {
    return {
      nom: champ.split('/')[0].trim(),
      description: champ.split('/')[1].trim(),
    };
  };
  private entrepôtRessourcesCyber: EntrepotRessourcesCyber;
}
