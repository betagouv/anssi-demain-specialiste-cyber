import { describe, expect, it } from 'vitest';
import {
  adaptateurJCOP,
  ReponseJCOP,
} from '../../src/infra/adapateurAntivirus';
import { PosteRessourceHttp } from '../../src/infra/clientHttp';
import { fauxAdaptateurEnvironnement } from '../api/fauxObjets';

describe("L'adaptateur JCOP ", () => {
  const desFichiersQuelconques = [
    Buffer.from('contenu du fichier 1'),
    Buffer.from('contenu du fichier 2'),
    Buffer.from('contenu du fichier 3'),
  ];
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
      desFichiersQuelconques,
      dependancesParDefaut,
    );

    expect(estInfecte).toBeFalsy();
  });

  it("n'appelle pas JCOP si aucun fichier n'est fourni", async () => {
    let estAppele = false;
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => {
      estAppele = true;
      return reponseJCOPOK;
    };

    const { estEnErreur } = await adaptateurJCOP.analyse([], {
      ...dependancesParDefaut,
      clientHttp,
    });

    expect(estAppele).toBeFalsy();
    expect(estEnErreur).toBeFalsy();
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

    await adaptateurJCOP.analyse(desFichiersQuelconques, {
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
      desFichiersQuelconques,
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

    const { estInfecte } = await adaptateurJCOP.analyse(
      desFichiersQuelconques,
      {
        ...dependancesParDefaut,
        clientHttp,
      },
    );
    expect(estInfecte).toBeTruthy();
  });

  it('sait gérer une erreur HTTP de JCOP', async () => {
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => {
      throw new Error('http erreur');
    };

    const { estInfecte, estEnErreur } = await adaptateurJCOP.analyse(
      desFichiersQuelconques,
      {
        ...dependancesParDefaut,
        clientHttp,
      },
    );
    expect(estInfecte).toBeUndefined();
    expect(estEnErreur).toBeTruthy();
  });
});
