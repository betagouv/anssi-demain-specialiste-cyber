<script lang="ts">
</script>

<div class="temoignages">
  <dsfr-container>
    <div class="contenu">
      <h2>Témoignages</h2>
      <img
        class="miniature-video"
        src="/assets/images/operation-cactus/temoignage-johanna-brousse.jpg"
        alt="Johanna Brousse, vice-procureur, chef de la section de lutte contre la cybercriminalité (JUNALCO)"
      />
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .temoignages {
    padding: 3rem 0 0;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h2 {
      margin: 0;
    }
  }

  .miniature-video {
    aspect-ratio: 1920 / 1080;
    display: block;
    height: auto;
    object-fit: cover;
    width: 100%;
  }
</style>
