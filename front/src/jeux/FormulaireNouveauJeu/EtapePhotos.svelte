<script lang="ts">
  import { onMount } from 'svelte';
  import { clic } from '../../actions.svelte';
  import type { ErreursValidationJeuEnEdition } from '../jeu';
  import { jeuEnEditionStore } from '../stores/jeuEnEdition.store';
  import { photosJeu, photosJeuStore } from '../stores/photosJeu.store';

  let { erreurs }: { erreurs: ErreursValidationJeuEnEdition } = $props();

  onMount(async () => {
    $photosJeuStore ??= {};
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

<div class="information">
  <dsfr-alert
    title="Protéger l’identité des élèves."
    text="Évitez d’inclure des photos où leurs visages sont visibles, sauf si vous avez obtenu leur consentement écrit. Guide sur les données à caractère personnel."
    type="info"
    size="md"
  >
  </dsfr-alert>
</div>

<fieldset class="couverture">
  <legend>Photo principale</legend>
  <p>
    Celle-ci servira de couverture pour présenter le jeu dans le catalogue.
    <br />
    Taille maximale : 5 Mo. Formats supportés : jpg, png.
  </p>
  <input
    type="file"
    id="couverture"
    name="couverture"
    accept="image/jpeg, image/png, image/jpg"
    oninput={surAjoutCouverture}
  />
  {#if erreurs.photos}
    <dsfr-alert
      hasTitle={false}
      hasDescription={true}
      text={erreurs.photos}
      type="error"
      size="sm"
      id="erreurs-couverture"
      dismissible={false}
    ></dsfr-alert>
  {/if}
  {#if $photosJeuStore && $photosJeuStore.couverture}
    <div class="previsualisation-couverture">
      <img
        src={URL.createObjectURL($photosJeuStore.couverture)}
        alt="Photo de couverture"
      />
    </div>
    <dsfr-button
      label="Supprimer"
      kind="tertiary-no-outline"
      hasIcon="true"
      icon="delete-bin-line"
      use:clic={photosJeu.supprimeCouverture}
    ></dsfr-button>
  {/if}
</fieldset>

<hr />

<fieldset class="photos">
  <legend>Ajouter des photos de l’événement (facultatif)</legend>
  <p>
    4 photos maximum. Taille maximale : xx Mo. Formats supportés : jpg, png.
  </p>
  {#if $photosJeuStore && $photosJeuStore.photos}
    <div class="previsualisations-photo">
      {#each $photosJeuStore.photos as photo}
        <div class="previsualisation-photo">
          <img src={URL.createObjectURL(photo)} alt="Photo de l’événement" />
        </div>
      {/each}
    </div>
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

<div class="consentement">
  <dsfr-checkbox
    id="consentement-photo"
    name="consentement-photo"
    status="default"
    label="J’atteste avoir recueilli le consentement des parents de tous les élèves présents sur les photos pour leur diffusion sur ce site."
    value={$jeuEnEditionStore.consentement}
    onvaluechanged={(e: CustomEvent) =>
      ($jeuEnEditionStore.consentement = e.detail)}
  ></dsfr-checkbox>
  <p>
    Si aucun visage n’apparaît sur les images, cette case n’a pas besoin d’être
    cochée. Vous pouvez passer à l’étape suivante.
  </p>
</div>

<style lang="scss">
  @use '../../points-de-rupture' as *;
  .information {
    padding: 1.5rem 0 0.5rem 0;
  }

  .couverture {
    p {
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      color: var(--text-mention-grey);
    }
  }

  .photos {
    p {
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      color: var(--text-mention-grey);
    }
  }

  .consentement {
    p {
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      color: var(--text-mention-grey);
      margin: 0;
      padding-left: 2rem;
    }
  }

  hr {
    align-self: stretch;
    height: 1px;
    border: 0;
    background-color: #dddddd;
    margin: 0.5rem 0;
  }

  .previsualisation-couverture {
    padding-top: 2rem;
    img {
      display: flex;
      height: 18.16825rem;
      flex-direction: column;
      align-items: flex-start;
      flex-shrink: 0;
      align-self: stretch;
      aspect-ratio: 4/3;
    }
  }

  .previsualisations-photo {
    display: grid;
    gap: 1.5rem;
    padding-bottom: 1.5rem;

    @include a-partir-de(sm) {
      grid-template-columns: repeat(1, 1fr);
    }

    @include a-partir-de(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    .previsualisation-photo {
      img {
        display: flex;
        height: 13.21925rem;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
        aspect-ratio: 4/3;
      }
    }
  }
</style>
