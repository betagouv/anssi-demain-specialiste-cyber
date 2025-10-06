import { MIMEType } from 'node:util';
import { Request } from 'express';

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
  sauvegarde: (_photosJeu: PhotosJeuTeleversees): Promise<void> => {
    return Promise.resolve();
  },
};

export const fabriqueAdaptateurTeleversement = (): AdaptateurTeleversement =>
  adaptateurDeTeleversement;
