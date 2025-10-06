<script lang="ts">
  import { onMount } from 'svelte';
  import { photosJeu, photosJeuStore } from '../stores/photosJeu.store';

  onMount(async () => {
    $photosJeuStore = {};
  });

  async function redimensionnePhoto(
    file: File,
    targetWidth: number,
    quality: number,
  ): Promise<Blob> {
    const bitmap = await createImageBitmap(file);

    const echelle = targetWidth / bitmap.width;
    const hauteurCible = Math.round(bitmap.height * echelle);

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = hauteurCible;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(bitmap, 0, 0, targetWidth, hauteurCible);

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) throw new Error('Failed to create Blob');
          resolve(blob);
        },
        'image/jpeg',
        quality,
      );
    });
  }

  const surAjoutCouverture = async (event: Event): Promise<void> => {
    const target = event.target as HTMLInputElement;
    const photo = target.files?.[0];
    if (!photo) return;

    const couverture = await redimensionnePhoto(photo, 1024, 0.75);
    photosJeu.ajouteCouverture(couverture);
  };

  const surAjoutPhoto = async (event: Event): Promise<void> => {
    const target = event.target as HTMLInputElement;
    const photo = target.files?.[0];
    if (!photo) return;

    const photoRedimensionnee = await redimensionnePhoto(photo, 1024, 0.75);
    photosJeu.ajoutePhoto(photoRedimensionnee);
  };
</script>

<fieldset class="couverture">
  <legend>Photo principale</legend>
  <input
    type="file"
    id="couverture"
    name="couverture"
    accept="image/jpeg, image/png, image/jpg"
    oninput={surAjoutCouverture}
  />
  {#if $photosJeuStore && $photosJeuStore.couverture}
    <div>
      <img
        src={URL.createObjectURL($photosJeuStore.couverture)}
        alt="Photo de couverture"
        class="previsualisation-couverture"
      />
    </div>
  {/if}
</fieldset>

<fieldset class="photos">
  <legend>Ajouter des photos de l’événement (facultatif)</legend>
  {#if $photosJeuStore && $photosJeuStore.photos}
    {#each $photosJeuStore.photos as photo}
      <div>
        <img
          src={URL.createObjectURL(photo)}
          alt="Photo de l’événement"
          class="previsualisation-photo"
        />
      </div>
    {/each}
  {/if}
  <input
    type="file"
    id="photo-1"
    name="photo-1"
    accept="image/jpeg, image/png, image/jpg"
    oninput={surAjoutPhoto}
    disabled={$photosJeuStore && $photosJeuStore.photos?.length === 4}
  />
</fieldset>

<style lang="scss">
  .previsualisation-couverture {
    display: flex;
    height: 18.16825rem;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    align-self: stretch;
    aspect-ratio: 4/3;
  }

  .previsualisation-photo {
    display: flex;
    height: 13.21925rem;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    aspect-ratio: 4/3;
  }
</style>
