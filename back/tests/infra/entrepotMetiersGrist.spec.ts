import { describe, expect, it } from 'vitest';
import { RecupereRessourceHttp } from '../../src/infra/clientHttp';
import { ReponseGrist } from '../../src/infra/entrepotGrist';
import {
  EntrepotMetiersGrist,
  MetierGrist,
} from '../../src/infra/entrepotMetiersGrist';
import {
  ConstructeurLigneGristMetiers,
  ConstructeurReponseMetiersGrist,
} from './constructeurDeMetiersGrist';

describe("L'entrepôt de métiers Grist ", () => {
  it('sait récupérer les vidéos des métiers', async () => {
    const metiersGrist: RecupereRessourceHttp<
      ReponseGrist<MetierGrist>
    > = async () =>
      new ConstructeurReponseMetiersGrist()
        .ajouteUneLigne(
          new ConstructeurLigneGristMetiers()
            .avecColonneVideos(
              'https://example.com/video1.mp4\nhttps://example.com/video2.mp4',
            )
            .construis(),
        )
        .construis();
    const entrepotMetiers = new EntrepotMetiersGrist(metiersGrist);

    const metier = await entrepotMetiers.parIdentifiant(1234);

    expect(metier!.liens.videos).toStrictEqual([
      'https://example.com/video1.mp4',
      'https://example.com/video2.mp4',
    ]);
  });
});
