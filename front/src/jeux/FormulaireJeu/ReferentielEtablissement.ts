import axios from 'axios';

export interface ReferentielEtablissement {
  trouveParNom: (nom: string) => Promise<string[]>;
}

export class AdaptateurAnnuaireEducationNationale
  implements ReferentielEtablissement
{
  constructor() {}

  async trouveParNom(nom: string) {
    const reponse = await axios.get(
      'https://data.education.gouv.fr/api/v2/catalog/datasets/fr-en-annuaire-education/records',
      {
        params: {
          select: 'nom_etablissement, code_departement',
          where: `nom_etablissement like '*${nom}*'`,
          limit: '20',
          offset: '0',
        },
      },
    );

    const resultats = reponse.data.records.map(
      (record: {
        record: {
          fields: { nom_etablissement: string; code_departement: string };
        };
      }) =>
        `${record.record.fields.nom_etablissement} (${Number(record.record.fields.code_departement)})`,
    );

    return resultats;
  }
}
