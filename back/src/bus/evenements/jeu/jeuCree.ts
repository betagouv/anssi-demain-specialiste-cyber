import { CategorieDeJeux } from '../../../metier/referentiels/categorieDeJeux';
import { Classe } from '../../../metier/referentiels/classes';
import { Discipline } from '../../../metier/referentiels/disciplines';
import { Sequence } from '../../../metier/referentiels/sequence';
import { ThematiqueDeJeux } from '../../../metier/referentiels/thematiqueDeJeux';

export class JeuCree {
  constructor(
    public readonly emailAuteur: string,
    public readonly nom: string,
    public readonly sequence: Sequence,
    public readonly nomEtablissement: string,
    public readonly classe: Classe,
    public readonly discipline: Discipline,
    public readonly nombreEleves: number,
    public readonly categorie: CategorieDeJeux,
    public readonly thematiques: ThematiqueDeJeux[],
  ) {}
}
