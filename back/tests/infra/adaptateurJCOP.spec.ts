import { describe, expect, it } from 'vitest';
import {
  adaptateurJCOP,
  ReponseJCOP,
} from '../../src/infra/adapateurAntivirus';
import { PosteRessourceHttp } from '../../src/infra/recupereRessourceHttp';
import { fauxAdaptateurEnvironnement } from '../api/fauxObjets';

describe("L'adaptateur JCOP ", () => {
  const unFichierNonInfecte = Buffer.from('contenu du fichier');
  const reponseJCOPOK: ReponseJCOP = {
    is_malware: false,
    status: true,
  };
  const fauxClientHttp: PosteRessourceHttp<ReponseJCOP> = async () => {
    return reponseJCOPOK;
  };
  const dependancesParDefaut = {
    clientHttp: fauxClientHttp,
    adaptateurEnvironnement: fauxAdaptateurEnvironnement,
  };

  it('sait analyser un fichier non infecté', async () => {
    const { estInfecte } = await adaptateurJCOP.analyse(
      unFichierNonInfecte,
      dependancesParDefaut,
    );

    expect(estInfecte).toBeFalsy();
  });

  it("sait appeler l'API JCOP avec les bons paramètres", async () => {
    let urlAppelee = '';
    let jetonAuth = '';
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async (
      url: string,
      _corps,
      config,
    ) => {
      urlAppelee = url;
      jetonAuth = config?.headers?.['X-Auth-Token'] || '';
      return reponseJCOPOK;
    };

    await adaptateurJCOP.analyse(unFichierNonInfecte, {
      ...dependancesParDefaut,
      clientHttp,
    });

    expect(urlAppelee).toEqual('https://mon-antivirus.local/');
    expect(jetonAuth).toEqual('monJetonJCOP');
  });

  it('sait interpreter un retour en erreur de JCOP', async () => {
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => ({
      error: "Une erreur s'est produite",
      error_code: 5000,
      is_malware: false,
      status: false,
    });

    const { estInfecte, estEnErreur } = await adaptateurJCOP.analyse(
      unFichierNonInfecte,
      {
        ...dependancesParDefaut,
        clientHttp,
      },
    );
    expect(estInfecte).toBeFalsy();
    expect(estEnErreur).toBeTruthy();
  });

  it("sait interpreter un retour de JCOP indiquant qu'un fichier infecté est présent", async () => {
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => ({
      is_malware: true,
      status: true,
    });

    const { estInfecte } = await adaptateurJCOP.analyse(unFichierNonInfecte, {
      ...dependancesParDefaut,
      clientHttp,
    });
    expect(estInfecte).toBeTruthy();
  });

  it('sait gérer une erreur HTTP de JCOP', async () => {
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => {
      throw new Error('http erreur');
    };

    const { estInfecte, estEnErreur } = await adaptateurJCOP.analyse(
      unFichierNonInfecte,
      {
        ...dependancesParDefaut,
        clientHttp,
      },
    );
    expect(estInfecte).toBeUndefined();
    expect(estEnErreur).toBeTruthy();
  });
});
