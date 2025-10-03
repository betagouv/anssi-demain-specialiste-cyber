import { assert, describe, expect, it } from 'vitest';
import {
  fabriqueAdaptateurTeleversement,
  ImagesJeuTeleversees,
} from '../../src/infra/adaptateurTeleversement';
import { MIMEType } from 'node:util';
import { Request } from 'express';

describe('L’adaptateur de téléversement', () => {
  it('détermine la photo de couverture', () => {
    const requete: Request = {
      files: {
        couverture: [
          { mimetype: 'image/jpeg', buffer: Buffer.from('une-image') },
        ],
      },
    } as unknown as Request;

    const imagesJeu = fabriqueAdaptateurTeleversement().imagesJeu(requete);

    expect(imagesJeu).toStrictEqual<ImagesJeuTeleversees>({
      couverture: {
        nom: 'couverture',
        mimeType: new MIMEType('image/jpeg'),
        image: expect.any(Buffer),
        chemin: expect.any(String),
      },
      photos: [],
    });
    expect(imagesJeu.couverture.chemin.endsWith('.jpeg')).toBeTruthy();
  });

  it('lève une exception si la couverture ne peut être déterminée', () => {
    const requete: Request = {
      files: {
        'pas-de-couverture': [
          { mimetype: 'image/jpeg', buffer: Buffer.from('une-image') },
        ],
      },
    } as unknown as Request;

    try {
      fabriqueAdaptateurTeleversement().imagesJeu(requete);
      assert.fail('La couverture est présente !');
    } catch (e: unknown | Error) {
      expect((e as Error).message).toBe(
        'La photo de couverture n’est pas fournie.',
      );
    }
  });

  it('détermine les photos supplémentaires', () => {
    const requete: Request = {
      files: {
        couverture: [
          { mimetype: 'image/jpeg', buffer: Buffer.from('une-image') },
        ],
        photos: [
          {
            mimetype: 'image/jpeg',
            buffer: Buffer.from('une-image'),
            filename: 'fichier-1',
          },
          {
            mimetype: 'image/png',
            buffer: Buffer.from('une-image'),
            filename: 'fichier-2',
          },
        ],
      },
    } as unknown as Request;

    const imagesJeu = fabriqueAdaptateurTeleversement().imagesJeu(requete);

    expect(imagesJeu).toStrictEqual<ImagesJeuTeleversees>({
      couverture: {
        nom: 'couverture',
        mimeType: new MIMEType('image/jpeg'),
        image: expect.any(Buffer),
        chemin: expect.any(String),
      },
      photos: [
        {
          nom: 'fichier-1',
          mimeType: new MIMEType('image/jpeg'),
          image: expect.any(Buffer),
          chemin: expect.any(String),
        },
        {
          nom: 'fichier-2',
          mimeType: new MIMEType('image/png'),
          image: expect.any(Buffer),
          chemin: expect.any(String),
        },
      ],
    });
    expect(imagesJeu.photos[0].chemin.endsWith('jpeg')).toBeTruthy();
    expect(imagesJeu.photos[1].chemin.endsWith('png')).toBeTruthy();
  });
});
