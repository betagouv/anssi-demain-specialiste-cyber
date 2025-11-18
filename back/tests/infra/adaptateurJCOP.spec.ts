import { describe, expect, it } from 'vitest';
import {
  AdaptateurJCOP,
  ReponseJCOP,
} from '../../src/infra/adaptateurAntivirus';
import { PosteRessourceHttp } from '../../src/infra/clientHttp';
import { fauxAdaptateurGestionErreur } from '../../src/infra/fauxAdaptateurGestionErreur';
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

  it('sait analyser un fichier non infecté', async () => {
    const adaptateurJCOP = new AdaptateurJCOP(
      fauxAdaptateurGestionErreur,
      fauxAdaptateurEnvironnement,
      fauxClientHttp,
    );
    const { estInfecte } = await adaptateurJCOP.analyse(desFichiersQuelconques);

    expect(estInfecte).toBeFalsy();
  });

  it("n'appelle pas JCOP si aucun fichier n'est fourni", async () => {
    let estAppele = false;
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => {
      estAppele = true;
      return reponseJCOPOK;
    };

    const adaptateurJCOP = new AdaptateurJCOP(
      fauxAdaptateurGestionErreur,
      fauxAdaptateurEnvironnement,
      clientHttp,
    );

    const { estEnErreur } = await adaptateurJCOP.analyse([]);

    expect(estAppele).toBeFalsy();
    expect(estEnErreur).toBeFalsy();
  });

  it("n'appelle pas JCOP si l'analyse est désactivée", async () => {
    let estAppele = false;
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => {
      estAppele = true;
      return reponseJCOPOK;
    };

    const adaptateurEnvironnementAnalyseOff = {
      ...fauxAdaptateurEnvironnement,
      antivirus: () => ({
        urlAnalyse: 'pas appele',
        jetonAnalyse: 'pas appele',
        analyseActive: false,
      }),
    };

    const adaptateurJCOP = new AdaptateurJCOP(
      fauxAdaptateurGestionErreur,
      adaptateurEnvironnementAnalyseOff,
      clientHttp,
    );

    const { estEnErreur } = await adaptateurJCOP.analyse(
      desFichiersQuelconques,
    );

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

    const adaptateurJCOP = new AdaptateurJCOP(
      fauxAdaptateurGestionErreur,
      fauxAdaptateurEnvironnement,
      clientHttp,
    );

    await adaptateurJCOP.analyse(desFichiersQuelconques);

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

    const adaptateurJCOP = new AdaptateurJCOP(
      fauxAdaptateurGestionErreur,
      fauxAdaptateurEnvironnement,
      clientHttp,
    );

    const { estInfecte, estEnErreur } = await adaptateurJCOP.analyse(
      desFichiersQuelconques,
    );
    expect(estInfecte).toBeFalsy();
    expect(estEnErreur).toBeTruthy();
  });

  it("sait interpreter un retour de JCOP indiquant qu'un fichier infecté est présent", async () => {
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => ({
      is_malware: true,
      status: true,
    });

    const adaptateurJCOP = new AdaptateurJCOP(
      fauxAdaptateurGestionErreur,
      fauxAdaptateurEnvironnement,
      clientHttp,
    );

    const { estInfecte } = await adaptateurJCOP.analyse(desFichiersQuelconques);
    expect(estInfecte).toBeTruthy();
  });

  it('sait gérer une erreur HTTP de JCOP', async () => {
    const clientHttp: PosteRessourceHttp<ReponseJCOP> = async () => {
      throw new Error('http erreur levée manuellement');
    };

    const adaptateurJCOP = new AdaptateurJCOP(
      fauxAdaptateurGestionErreur,
      fauxAdaptateurEnvironnement,
      clientHttp,
    );

    const { estInfecte, estEnErreur } = await adaptateurJCOP.analyse(
      desFichiersQuelconques,
    );
    expect(estInfecte).toBeUndefined();
    expect(estEnErreur).toBeTruthy();
  });
});
