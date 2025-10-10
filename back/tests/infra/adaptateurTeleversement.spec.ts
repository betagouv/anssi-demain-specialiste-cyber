import { assert, describe, expect, it } from 'vitest';
import {
  fabriqueAdaptateurTeleversement,
  PhotosJeuTeleversees,
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

    const imagesJeu = fabriqueAdaptateurTeleversement().photosJeu(requete);

    expect(imagesJeu).toStrictEqual<PhotosJeuTeleversees>({
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
      fabriqueAdaptateurTeleversement().photosJeu(requete);
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

    const imagesJeu = fabriqueAdaptateurTeleversement().photosJeu(requete);

    expect(imagesJeu).toStrictEqual<PhotosJeuTeleversees>({
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

  describe("renvoie le type de l'image en se basant sur la signature", () => {
    it.each([
      {
        nom: 'PNG',
        buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        attendu: 'image/png',
      },
      {
        nom: 'JPEG (JFIF)',
        buffer: Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46]),
        attendu: 'image/jpeg',
      },
      {
        nom: 'JPEG (EXIF)',
        buffer: Buffer.from([0xff, 0xd8, 0xff, 0xe1, 0x00, 0x16, 0x45, 0x78]),
        attendu: 'image/jpeg',
      },
      {
        nom: 'JPEG',
        buffer: Buffer.from([0xff, 0xd8, 0xff, 0xdb, 0x00, 0x10, 0x4a, 0x46]),
        attendu: 'image/jpeg',
      },
    ])('pour une image $nom', ({ buffer, attendu }) => {
      const mimeType =
        fabriqueAdaptateurTeleversement().recupereTypeImage(buffer);

      expect(mimeType).toBe(attendu);
    });

    it('pour un fichier inconnu', () => {
      const bufferInconnu = Buffer.from([
        0xff, 0xff, 0xff, 0xff, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
      ]);

      const mimeType =
        fabriqueAdaptateurTeleversement().recupereTypeImage(bufferInconnu);

      expect(mimeType).toBeUndefined();
    });

    it('pour un fichier indéfini', () => {
      const bufferIndefini = undefined;

      const mimeType =
        fabriqueAdaptateurTeleversement().recupereTypeImage(bufferIndefini);

      expect(mimeType).toBeUndefined();
    });
  });
});
