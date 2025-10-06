import { MIMEType } from 'node:util';
import { Request } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';
import { adaptateurEnvironnement } from './adaptateurEnvironnement';

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
};

const adaptateurDeTeleversement: AdaptateurTeleversement = {
  photosJeu: (requete: Request): PhotosJeuTeleversees => {
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
  },
  sauvegarde: async (photosJeu: PhotosJeuTeleversees): Promise<void> => {
    const televerseLaPhoto = (photo: FichierImage) => {
      try {
        return new S3Client({
          endpoint: adaptateurEnvironnement.televersement().urlCellar,
          region: adaptateurEnvironnement.televersement().region,
          credentials: fromEnv(),
        }).send(
          new PutObjectCommand({
            Bucket: adaptateurEnvironnement.televersement().bucketPhotosJeux,
            Body: photo.image,
            Key: photo.chemin,
          }),
        );
      } catch (error: unknown | Error) {
        // eslint-disable-next-line no-console
        console.error(
          'Impossible de téléverser la photo ’%s’. Détails :%s',
          photo.nom,
          error,
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
  },
};

export const fabriqueAdaptateurTeleversement = (): AdaptateurTeleversement => {
  if (adaptateurEnvironnement.televersementEnMemoire()) {
    return {
      ...adaptateurDeTeleversement,
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
      },
    };
  }
  return adaptateurDeTeleversement;
};
