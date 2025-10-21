import {
  AdaptateurEnvironnement,
  adaptateurEnvironnement as adaptateurEnvironnementProd,
} from './adaptateurEnvironnement';
import { creePosteRessourceHttp, PosteRessourceHttp } from './clientHttp';

export type ReponseJCOP = {
  status: boolean;
  is_malware: boolean;
  error_code?: number;
  error?: string;
};

export type ResultatAnalyseFichier = {
  estInfecte?: boolean;
  estEnErreur: boolean;
};

export type AdaptateurAntivirus = {
  analyse: (
    fichiers: Buffer<ArrayBuffer>[],
    dependances?: {
      clientHttp: PosteRessourceHttp<ReponseJCOP>;
      adaptateurEnvironnement: AdaptateurEnvironnement;
    },
  ) => Promise<ResultatAnalyseFichier>;
};

export const adaptateurJCOP: AdaptateurAntivirus = {
  analyse: async (
    fichiers: Buffer<ArrayBuffer>[],
    { clientHttp, adaptateurEnvironnement } = {
      clientHttp: creePosteRessourceHttp(),
      adaptateurEnvironnement: adaptateurEnvironnementProd,
    },
  ) => {
    if (
      !fichiers.length ||
      !adaptateurEnvironnement.antivirus().analyseActive
    ) {
      return { estEnErreur: false };
    }

    try {
      const formulaire = new FormData();
      const promesses = fichiers.map(async (fichier) => {
        formulaire.append('file', new Blob([fichier]));
        const reponse = await clientHttp(
          adaptateurEnvironnement.antivirus().urlAnalyse,
          formulaire,
          {
            headers: {
              'X-Auth-Token': adaptateurEnvironnement.antivirus().jetonAnalyse,
            },
          },
        );
        // eslint-disable-next-line no-console
        console.log('reponse JCOP : ', reponse);
        return reponse;
      });
      const listeDesResultats = await Promise.all(promesses);
      return {
        estInfecte: listeDesResultats.some((r) => r.is_malware),
        estEnErreur: listeDesResultats.some((r) => !r.status),
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Analyse antivirus en erreur', e);
      return {
        estEnErreur: true,
      };
    }
  },
};
