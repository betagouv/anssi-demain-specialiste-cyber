import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const photosJeuStore = writable<Photos>(undefined);

type Photos = {
  couverture?: Blob;
  photos?: Blob[];
};

const NOMBRE_MAX_PHOTOS = 4;

export const photosJeu = {
  subscribe: photosJeuStore.subscribe,
  set: photosJeuStore.set,
  ajouteCouverture(couverture: Blob) {
    const photosActuelles = get(photosJeuStore);
    const photos: Blob[] = [];
    if (photosActuelles) {
      photos.push(...(photosActuelles.photos || []));
    }
    photosJeuStore.set({ couverture, photos });
  },
  ajoutePhoto(photo: Blob) {
    const photosActuelles = get(photosJeuStore);
    if (
      photosActuelles &&
      photosActuelles.photos?.length === NOMBRE_MAX_PHOTOS
    ) {
      return;
    }
    photosJeuStore.set({
      photos: [photo, ...((photosActuelles && photosActuelles.photos) || [])],
      ...(photosActuelles?.couverture && {
        couverture: photosActuelles.couverture,
      }),
    });
  },
  supprimePhoto(photo: Blob) {
    const photosActuelles = get(photosJeuStore);
    const photosAConserver = photosActuelles.photos?.filter((p) => p !== photo);
    photosJeuStore.set({
      photos: photosAConserver,
      couverture: photosActuelles.couverture,
    });
  },
};
