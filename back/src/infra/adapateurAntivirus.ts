import {
  AdaptateurEnvironnement,
  adaptateurEnvironnement as adaptateurEnvironnementProd,
} from './adaptateurEnvironnement';
import {
  creePosteRessourceHttp,
  PosteRessourceHttp,
} from './recupereRessourceHttp';

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
    fichier: Buffer<ArrayBuffer>,
    dependances?: {
      clientHttp: PosteRessourceHttp<ReponseJCOP>;
      adaptateurEnvironnement: AdaptateurEnvironnement;
    },
  ) => Promise<ResultatAnalyseFichier>;
};

export const adaptateurJCOP: AdaptateurAntivirus = {
  analyse: async (
    fichier: Buffer<ArrayBuffer>,
    { clientHttp, adaptateurEnvironnement } = {
      clientHttp: creePosteRessourceHttp(),
      adaptateurEnvironnement: adaptateurEnvironnementProd,
    },
  ) => {
    const formulaire = new FormData();
    formulaire.append('file', new Blob([fichier]));
    try {
      const { is_malware, status } = await clientHttp(
        adaptateurEnvironnement.antivirus().urlAnalyse,
        formulaire,
        {
          headers: {
            'X-Auth-Token': adaptateurEnvironnement.antivirus().jetonAnalyse,
          },
        },
      );
      return { estInfecte: is_malware, estEnErreur: !status };
    } catch {
      return {
        estEnErreur: true,
      };
    }
  },
};
