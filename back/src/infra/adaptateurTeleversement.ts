import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';
import { Request } from 'express';
import { MIMEType } from 'node:util';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';
import { AdaptateurGestionErreur } from './adaptateurGestionErreurSentry';

type FichierImage = {
  nom: string;
  mimeType: MIMEType;
  image: Buffer;
  chemin: string;
};

export type PhotosJeuTeleversees = {
  couverture: FichierImage;
  photos: FichierImage[];
};

export type AdaptateurTeleversement = {
  photosJeu: (requete: Request) => PhotosJeuTeleversees;
  sauvegarde(photosJeu: PhotosJeuTeleversees): Promise<void>;
  recupereTypeImage(buffer?: Buffer): 'image/png' | 'image/jpeg' | undefined;
};

export class AdaptateurDeTeleversementCellar
  implements AdaptateurTeleversement
{
  constructor(private readonly consignateurErreur: AdaptateurGestionErreur) {}
  photosJeu(requete: Request): PhotosJeuTeleversees {
    const estUnFichierPhoto = (
      fichier:
        | {
            [fieldname: string]: Express.Multer.File[];
          }
        | Express.Multer.File[]
        | undefined,
      clef: string,
    ): fichier is { [fieldname: string]: Express.Multer.File[] } => {
      return !!fichier && !Array.isArray(fichier) && !!fichier[clef];
    };

    const lesPhotos = estUnFichierPhoto(requete.files, 'photos')
      ? requete.files['photos']
      : [];

    const couverture = estUnFichierPhoto(requete.files, 'couverture')
      ? requete.files['couverture'][0]
      : undefined;

    if (!couverture) {
      throw new Error('La photo de couverture n’est pas fournie.');
    }
    const typeMimeCouverture = new MIMEType(couverture.mimetype);
    return {
      couverture: {
        nom: 'couverture',
        mimeType: typeMimeCouverture,
        image: couverture.buffer,
        chemin: `${crypto.randomUUID()}.${typeMimeCouverture.subtype}`,
      },
      photos: Array.from(lesPhotos).map((photo) => {
        const typeMimePhoto = new MIMEType(photo.mimetype);
        return {
          nom: photo.filename,
          mimeType: typeMimePhoto,
          image: photo.buffer,
          chemin: `${crypto.randomUUID()}.${typeMimePhoto.subtype}`,
        };
      }),
    };
  }
  async sauvegarde(photosJeu: PhotosJeuTeleversees): Promise<void> {
    const televerseLaPhoto = (photo: FichierImage) => {
      try {
        return new S3Client({
          endpoint: adaptateurEnvironnement.televersement().urlCellar,
          region: adaptateurEnvironnement.televersement().region,
          credentials: fromEnv(),
        }).send(
          new PutObjectCommand({
            ACL: 'public-read',
            ContentType: photo.mimeType.type,
            Bucket: adaptateurEnvironnement.televersement().bucketPhotosJeux,
            Body: photo.image,
            Key: photo.chemin,
          }),
        );
      } catch (error: unknown | Error) {
        this.consignateurErreur.erreur(
          error as Error,
          `Impossible de téléverser la photo ${photo.nom}.`,
        );
      }
    };

    try {
      await televerseLaPhoto(photosJeu.couverture);
      for (const photo of photosJeu.photos) {
        await televerseLaPhoto(photo);
      }
    } catch (_error: unknown | Error) {
      throw new Error('Impossible de téléverser les photos');
    }
    return Promise.resolve();
  }
  recupereTypeImage(buffer: Buffer) {
    const valideLaSignatureDuFichier = (
      tableauDOctets: Uint8Array,
      signaturesValides: Array<number[]>,
    ): boolean => {
      return signaturesValides.some((signature) =>
        signature.every((octet, index) => octet === tableauDOctets[index]),
      );
    };

    if (!buffer) return undefined;

    const signaturePNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    const signaturesJPEG = [
      [0xff, 0xd8, 0xff, 0xe0], // JPEG signature (JFIF)
      [0xff, 0xd8, 0xff, 0xe1], // JPEG signature (Exif)
      [0xff, 0xd8, 0xff, 0xdb], // JPEG signature
    ];

    const tableauDOctets = new Uint8Array(8);
    buffer.copy(tableauDOctets, 0, 0, 8);

    if (valideLaSignatureDuFichier(buffer, [signaturePNG])) return 'image/png';
    if (valideLaSignatureDuFichier(buffer, signaturesJPEG)) return 'image/jpeg';
    return undefined;
  }
}

export class AdaptateurDeTeleversementMemoire extends AdaptateurDeTeleversementCellar {
  async sauvegarde(photosJeu: PhotosJeuTeleversees): Promise<void> {
    const lesPhotos = photosJeu.photos.map((p) => ({
      nom: p.nom,
      chemin: p.chemin,
      typeMIME: p.mimeType,
    }));
    lesPhotos.push({
      nom: photosJeu.couverture.nom,
      chemin: photosJeu.couverture.chemin,
      typeMIME: photosJeu.couverture.mimeType,
    });
    // eslint-disable-next-line no-console
    console.log('Sauvegarde des images de jeu', JSON.stringify(lesPhotos));
  }
  recupereTypeImage(_buffer: Buffer): 'image/png' {
    return 'image/png';
  }
}

export const fabriqueAdaptateurTeleversement = (
  adaptateurGestionErreur: AdaptateurGestionErreur,
): AdaptateurTeleversement => {
  if (adaptateurEnvironnement.televersementEnMemoire()) {
    return new AdaptateurDeTeleversementMemoire(adaptateurGestionErreur);
  }
  return new AdaptateurDeTeleversementCellar(adaptateurGestionErreur);
};
