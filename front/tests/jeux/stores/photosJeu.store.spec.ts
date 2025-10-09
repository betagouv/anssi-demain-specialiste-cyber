import { describe, expect, it } from 'vitest';
import { get } from 'svelte/store';
import { photosJeu } from '../../../src/jeux/stores/photosJeu.store';

describe('L’ajout de photos d’un jeu', () => {
  it('ajoute une couverture', () => {
    photosJeu.set({});

    photosJeu.ajouteCouverture(new Blob());

    expect(get(photosJeu)).toEqual({
      couverture: expect.any(Blob),
      photos: [],
    });
  });

  it('modifie une couverture ', () => {
    photosJeu.set({ couverture: new Blob(), photos: undefined });

    photosJeu.ajouteCouverture(new Blob());

    expect(get(photosJeu)).toEqual({
      couverture: expect.any(Blob),
      photos: [],
    });
  });

  it('modifie une couverture tout en conservant les photos', () => {
    const photos = [new Blob()];
    photosJeu.set({ couverture: new Blob(), photos });

    photosJeu.ajouteCouverture(new Blob());

    expect(get(photosJeu)).toEqual({
      couverture: expect.any(Blob),
      photos,
    });
  });

  it('ajoute une photo', () => {
    photosJeu.set({});

    const photo = new Blob();
    photosJeu.ajoutePhoto(photo);

    expect(get(photosJeu)).toEqual({
      photos: [photo],
    });
  });

  it('ajoute une photo et conserve la couverture', () => {
    const couverture = new Blob();
    photosJeu.set({ couverture: couverture });

    const photo = new Blob();
    photosJeu.ajoutePhoto(photo);

    expect(get(photosJeu)).toEqual({
      couverture,
      photos: [photo],
    });
  });

  it('ajoute une seconde photo', () => {
    const premierePhoto = new Blob();
    photosJeu.set({ photos: [premierePhoto] });

    const photo = new Blob();
    photosJeu.ajoutePhoto(photo);

    expect(get(photosJeu)).toEqual({
      photos: [premierePhoto, photo],
    });
  });

  it('ajoute jusqu‘à 4 photos', async () => {
    const premierePhoto = new File(['blob1'], 'blob1.jpg');
    const deuxiemePhoto = new File(['blob2'], 'blob2.jpg');
    const troisiemePhoto = new File(['blob3'], 'blob3.jpg');
    const quatriemePhoto = new File(['blob4'], 'blob4.jpg');
    photosJeu.set({ photos: [premierePhoto] });

    const cinquiemePhoto = new File(['blob5'], 'blob5.jpg');
    photosJeu.ajoutePhoto(deuxiemePhoto);
    photosJeu.ajoutePhoto(troisiemePhoto);
    photosJeu.ajoutePhoto(quatriemePhoto);
    photosJeu.ajoutePhoto(cinquiemePhoto);

    const fichiersEnMemoire = get(photosJeu).photos as File[];

    expect(fichiersEnMemoire.map((f) => f.name)).toStrictEqual(
      [premierePhoto, deuxiemePhoto, troisiemePhoto, quatriemePhoto].map(
        (f) => f.name,
      ),
    );
  });

  it('supprime une photo', () => {
    const premierePhoto = new Blob(['1']);
    const deuxiemePhoto = new Blob(['2']);
    const troisiemePhoto = new Blob(['3']);
    const quatriemePhoto = new Blob(['4']);
    photosJeu.set({
      photos: [premierePhoto, deuxiemePhoto, troisiemePhoto, quatriemePhoto],
    });

    photosJeu.supprimePhoto(deuxiemePhoto);

    expect(get(photosJeu)).toEqual({
      photos: [premierePhoto, troisiemePhoto, quatriemePhoto],
    });
  });

  it('supprime une photo alors que la photo de couverture n‘est pas présente', () => {
    const premierePhoto = new Blob(['1']);
    const deuxiemePhoto = new Blob(['2']);
    const troisiemePhoto = new Blob(['3']);
    const quatriemePhoto = new Blob(['4']);
    photosJeu.set({
      photos: [premierePhoto, deuxiemePhoto, troisiemePhoto, quatriemePhoto],
    });

    photosJeu.supprimePhoto(deuxiemePhoto);

    expect(get(photosJeu)).toEqual({
      photos: [premierePhoto, troisiemePhoto, quatriemePhoto],
    });
  });
});
