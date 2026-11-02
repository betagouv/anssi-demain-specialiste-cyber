import { EntrepôtFamillesDeMétier } from '../metier/entrepotFamillesDeMetier';
import { EntrepôtFonctions } from '../metier/entrepotFonctions';
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
    Metiers: number[];
  };
};

export class EntrepôtFamillesDeMétierGrist
  extends EntrepotGrist<FamilleDeMetierGrist>
  implements EntrepôtFamillesDeMétier
{
  private entrepôtMétiers: EntrepotMetiers;
  private entrepôtRessourcesCyber: EntrepotRessourcesCyber;
  private entrepôtFonctions: EntrepôtFonctions;

  constructor(
    entrepôtMétiers: EntrepotMetiers,
    entrepôtRessourcesCyber: EntrepotRessourcesCyber,
    entrepôtFonctions: EntrepôtFonctions,
    famillesDeMetierGrist: RecupereRessourceHttp<
      ReponseGrist<FamilleDeMetierGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    super(
      famillesDeMetierGrist,
      adaptateurEnvironnement.grist().idDocument,
      adaptateurEnvironnement.grist().famillesDeMétier().idTable,
    );
    this.entrepôtFonctions = entrepôtFonctions;
    this.entrepôtRessourcesCyber = entrepôtRessourcesCyber;
    this.entrepôtMétiers = entrepôtMétiers;
  }

  async tous(): Promise<FamilleDeMétier[]> {
    const métiers = await this.entrepôtMétiers.tous();
    const ressourcesCyber = await this.entrepôtRessourcesCyber.tous();
    const fonctions = await this.entrepôtFonctions.tous();

    const réponse = await this.appelleGrist();
    return réponse.records.map((familleGrist) => {
      return new FamilleDeMétier({
        code: familleGrist.fields.Famille,
        titre: familleGrist.fields.Titre_Hero,
        sousTitre: familleGrist.fields.Sous_texte_Hero,
        description: familleGrist.fields.En_bref,
        rôles: [
          this.champEnRôle(familleGrist.fields.Tuile_1),
          this.champEnRôle(familleGrist.fields.Tuile_2),
          this.champEnRôle(familleGrist.fields.Tuile_3),
        ],
        profils: this.versEntités(
          familleGrist.fields.Profils_de_cette_famille,
          métiers,
        ),
        ressourcesAssociées: this.versEntités(
          familleGrist.fields.Ressources_associees,
          ressourcesCyber,
        ),
        fonctions: this.versEntités(familleGrist.fields.Metiers, fonctions),
      });
    });
  }

  private versEntités = <T extends { id: number }>(
    listeIdsGrist: number[],
    listeEntités: T[],
  ): T[] =>
    this.aseptiseListe(listeIdsGrist)
      .map((id) => listeEntités.find((entité) => entité.id === id))
      .filter((entité) => entité !== undefined);

  private champEnRôle = (champ: string) => {
    return {
      nom: champ.split('/')[0].trim(),
      description: champ.split('/')[1].trim(),
    };
  };
}
