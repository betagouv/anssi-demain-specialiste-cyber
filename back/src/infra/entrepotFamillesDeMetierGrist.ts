import { EntrepôtFamillesDeMétier } from '../metier/entrepotFamillesDeMetier';
import { EntrepotMetiers } from '../metier/entrepotMetiers';
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
  };
};

export class EntrepôtFamillesDeMétierGrist
  extends EntrepotGrist<FamilleDeMetierGrist>
  implements EntrepôtFamillesDeMétier
{
  private entrepôtMétiers: EntrepotMetiers;

  constructor(
    entrepôtMétiers: EntrepotMetiers,
    famillesDeMetierGrist: RecupereRessourceHttp<
      ReponseGrist<FamilleDeMetierGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    super(
      famillesDeMetierGrist,
      adaptateurEnvironnement.grist().idDocument,
      adaptateurEnvironnement.grist().famillesDeMétier().idTable,
    );
    this.entrepôtMétiers = entrepôtMétiers;
  }

  async tous(): Promise<FamilleDeMétier[]> {
    const métiers = await this.entrepôtMétiers.tous();

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
        }),
    );
  }
  private champEnRôle = (champ: string) => {
    return {
      nom: champ.split('/')[0].trim(),
      description: champ.split('/')[1].trim(),
    };
  };
}
