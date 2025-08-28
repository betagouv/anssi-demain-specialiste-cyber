import { describe, expect, it } from 'vitest';
import {
  EntrepotRessourcesCyberGrist,
  ReponseRessourceCyberGrist,
} from '../../src/infra/entrepotRessourcesCyberGrist';
import { LectureHttp } from '../../src/infra/lectureHttp';
import { RessourceCyber } from '../../src/metier/ressourceCyber';

describe("L'entrepôt de ressources cyber Grist ", () => {
  const reponseCyberEnJeux = {
    records: [
      {
        id: 1,
        fields: {
          A: '4e24da60-90c0-4aee-baa3-8666fa816fed',
          Titre: 'CyberEnJeux',
          Description: 'Former à la cybersécurité par le jeu',
          Besoins: ['L', "S'entraîner", 'Prévenir'],
          Thematiques: [
            'L',
            'Techniques de sécurité numérique',
            'Comportements numériques',
            'Valoriser les talents féminins',
          ],
          Type: ['L', 'Jeux'],
          Cible: ['L', 'Personnel éducatif', 'Elèves'],
          Parcours_sur_page: [
            'L',
            'Accueil',
            'Parcours Enseignant',
            'Parcours Eleves',
          ],
          Label_DSC: true,
          Cycle_si_eleves: ['L', 'Ecole', 'Collège', 'Lycée'],
          Porteur: ['L', 'Etat (ministères, opérateurs)', 'ANSSI'],
          Lien: 'https://cyber.gouv.fr/actualites/au-college-et-au-lycee-former-a-la-cybersecurite-par-le-jeu',
        },
      },
    ],
  };

  it('sait appeler la bonne ressource', async () => {
    let urlAppelee = '';
    const clientHttp: LectureHttp<ReponseRessourceCyberGrist> = {
      get: async (url: string) => {
        urlAppelee = url;
        return { records: [] };
      },
    };
    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      clientHttp
    );

    await entrepotRessourcesCyberGrist.tous();

    expect(urlAppelee).toEqual(
      'http://example.com/v1/mon_id_document/tables/mon_id_table/records'
    );
  });

  it("vérifie l'entête d'authentification", async () => {
    let enteteAuthorisation: string | undefined = undefined;
    const clientHttp: LectureHttp<ReponseRessourceCyberGrist> = {
      get: async (_url: string, config) => {
        enteteAuthorisation = config?.headers?.['Authorization'];
        return { records: [] };
      },
    };
    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      clientHttp
    );

    await entrepotRessourcesCyberGrist.tous();

    expect(enteteAuthorisation).toEqual('Bearer ma_cle_api');
  });

  it('sait récupérer des ressources Cyber en appelant Grist', async () => {
    const clientHttp: LectureHttp<ReponseRessourceCyberGrist> = {
      get: async () => {
        return reponseCyberEnJeux;
      },
    };
    const entrepotRessourcesCyberGrist = new EntrepotRessourcesCyberGrist(
      clientHttp
    );

    const ressourcesCyber = await entrepotRessourcesCyberGrist.tous();

    expect(ressourcesCyber).toStrictEqual<RessourceCyber[]>([
      {
        id: 1,
        titre: 'CyberEnJeux',
      },
    ]);
  });
});
