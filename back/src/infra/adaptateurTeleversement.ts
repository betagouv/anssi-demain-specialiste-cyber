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
};

export const fabriqueAdaptateurTeleversement = (): AdaptateurTeleversement => ({
  photosJeu: (_requete: Request): PhotosJeuTeleversees => ({
    couverture: {
      nom: 'couverture',
      mimeType: new MIMEType('image/jpeg'),
      image: Buffer.from('couverture'),
      chemin: 'chemin',
    },
    photos: [],
  }),
});
