import { MIMEType } from 'node:util';
import { Request } from 'express';

type FichierImage = {
  nom: string;
  mimeType: MIMEType;
  image: Buffer;
  chemin: string;
};

export type ImagesJeuTeleversees = {
  couverture: FichierImage;
  photos: FichierImage[];
};

export type AdaptateurTeleversement = {
  imagesJeu: (requete: Request) => ImagesJeuTeleversees;
};

export const fabriqueAdaptateurTeleversement = (): AdaptateurTeleversement => ({
  imagesJeu: (_requete: Request): ImagesJeuTeleversees => ({
    couverture: {
      nom: 'couverture',
      mimeType: new MIMEType('image/jpeg'),
      image: Buffer.from('couverture'),
      chemin: 'chemin',
    },
    photos: [],
  }),
});
