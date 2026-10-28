import { EntrepôtFamillesDeMétier } from '../metier/entrepotFamillesDeMetier';
import { FamilleDeMétier } from '../metier/familleDeMetier';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { creeRecupereRessourceHttp, RecupereRessourceHttp } from './clientHttp';
import { EntrepotGrist, ReponseGrist } from './entrepotGrist';

export type FamilleDeMetierGrist = {
  fields: {
    Famille: string;
    ['Titre_Hero']: string;
    ['Sous_texte_Hero']: string;
    ['En_bref']: string;
    ['Tuile_1']: string;
    ['Tuile_2']: string;
    ['Tuile_3']: string;
  };
};

export class EntrepôtFamillesDeMétierGrist
  extends EntrepotGrist<FamilleDeMetierGrist>
  implements EntrepôtFamillesDeMétier
{
  constructor(
    famillesDeMetierGrist: RecupereRessourceHttp<
      ReponseGrist<FamilleDeMetierGrist>
    > = creeRecupereRessourceHttp(),
  ) {
    super(
      famillesDeMetierGrist,
      adaptateurEnvironnement.grist().idDocument,
      adaptateurEnvironnement.grist().famillesDeMétier().idTable,
    );
  }

  async tous(): Promise<FamilleDeMétier[]> {
    const réponse = await this.appelleGrist();
    return réponse.records.map(
      (familleGrist) =>
        new FamilleDeMétier({
          code: familleGrist.fields.Famille,
          titre: familleGrist.fields['Titre_Hero'],
          sousTitre: familleGrist.fields['Sous_texte_Hero'],
          description: familleGrist.fields['En_bref'],
          rôles: [
            this.champEnRôle(familleGrist.fields['Tuile_1']),
            this.champEnRôle(familleGrist.fields['Tuile_2']),
            this.champEnRôle(familleGrist.fields['Tuile_3']),
          ],
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
