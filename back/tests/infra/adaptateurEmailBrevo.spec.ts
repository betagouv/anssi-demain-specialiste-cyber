import { describe, expect, it } from 'vitest';
import {
  AdaptateurEmailBrevo,
  ReponseBrevo,
} from '../../src/infra/adaptateurExpediteurEmail';
import { PosteRessourceHttp } from '../../src/infra/clientHttp';
import { fauxAdaptateurEnvironnement } from '../api/fauxObjets';

describe("L'adaptateur d'email brevo", () => {
  it('sait creer un contact en appelant brevo avec les bons paramètres', async () => {
    let urlAppelee = '';
    let coprsEnvoye = {};
    let configEnvoyee = undefined;
    const posteur: PosteRessourceHttp<ReponseBrevo> = async (
      url,
      corps,
      config,
    ) => {
      urlAppelee = url;
      coprsEnvoye = corps;
      configEnvoyee = config;
      return {
        status: 'ok',
      };
    };
    const adaptateur = new AdaptateurEmailBrevo(
      fauxAdaptateurEnvironnement,
      posteur,
    );

    await adaptateur.creeContact({
      email: 'mon.email@mail.com',
      prenom: 'Homer',
      nom: 'Simpsons',
      infolettreAcceptee: true,
    });

    expect(urlAppelee).toEqual('https://mon-expediteur-de-mail/contacts');
    expect(coprsEnvoye).toStrictEqual({
      updateEnabled: true,
      email: 'mon.email@mail.com',
      emailBlacklisted: false,
      attributes: {
        PRENOM: 'Homer',
        NOM: 'Simpsons',
      },
    });
    expect(configEnvoyee).toStrictEqual({
      headers: {
        'api-key': 'cle-api-expediteur-de-mail',
        accept: 'application/json',
        'content-type': 'application/json',
      },
    });
  });
});
