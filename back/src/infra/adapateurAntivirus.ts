import { AdaptateurEnvironnement } from './adaptateurEnvironnement';
import { AdaptateurGestionErreur } from './adaptateurGestionErreurSentry';
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
  analyse: (fichiers: Buffer<ArrayBuffer>[]) => Promise<ResultatAnalyseFichier>;
};
export class AdaptateurJCOP implements AdaptateurAntivirus {
  private readonly headers: Record<string, string>;
  constructor(
    private readonly consignateurErreur: AdaptateurGestionErreur,
    private readonly adaptateurEnvironnement: AdaptateurEnvironnement,
    private readonly clientHttp: PosteRessourceHttp<ReponseJCOP> = creePosteRessourceHttp(),
  ) {
    this.headers = {
      'X-Auth-Token': this.adaptateurEnvironnement.antivirus().jetonAnalyse,
    };
  }

  async analyse(fichiers: Buffer<ArrayBuffer>[]) {
    if (
      !fichiers.length ||
      !this.adaptateurEnvironnement.antivirus().analyseActive
    ) {
      return { estEnErreur: false };
    }

    try {
      const formulaire = new FormData();
      const promesses = fichiers.map(async (fichier) => {
        formulaire.append('file', new Blob([fichier]));
        const reponse = await this.clientHttp(
          this.adaptateurEnvironnement.antivirus().urlAnalyse,
          formulaire,
          {
            headers: this.headers,
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
    } catch (e: unknown | Error) {
      this.consignateurErreur.erreur(e as Error, 'Analyse antivirus en erreur');
      return {
        estEnErreur: true,
      };
    }
  }
}
