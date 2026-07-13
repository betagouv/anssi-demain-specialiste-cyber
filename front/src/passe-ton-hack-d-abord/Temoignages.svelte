<script lang="ts">
</script>

<div class="temoignages">
  <dsfr-container>
    <div class="contenu">
      <h2 class="titre">Témoignages</h2>
      <div class="video">
        <img
          src="/assets/images/passe-ton-hack-d-abord/temoignages/video-placeholder.jpg"
          alt="Témoignage vidéo d’élèves participant au challenge"
        />
      </div>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .temoignages {
    padding-top: 3.5rem;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .titre {
    color: var(--text-title-grey);
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 2.25rem;
    margin: 0;
  }

  .video {
    aspect-ratio: 1920 / 1080;
    overflow: hidden;
    width: 100%;

    img {
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }
</style>
