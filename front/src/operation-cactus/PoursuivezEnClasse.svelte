<script lang="ts">
</script>

<div class="poursuivez-en-classe">
  <dsfr-container>
    <div class="corps">
      <div class="contenu">
        <h2>Poursuivez en classe par une action de sensibilisation</h2>
        <img
          class="illustration-sensibilisation"
          src="/assets/images/operation-cactus/sensibilisation.avif"
          alt=""
        />
        <p class="texte-standard-md">
          Juste après l’opération, une première séance pour activer des réflexes
          peut se décliner par d’autres actions perlées en lien avec les
          programmes scolaires ou des événements de l’école ou de
          l’établissement.
        </p>
        <dsfr-highlight text="ignoré">
          <p slot="text" class="texte-standard-md">
            La sensibilisation est plus effective si elle est faite tout au long
            de l’année.
          </p>
        </dsfr-highlight>
      </div>
      <dsfr-button
        label="Découvrez les ressources pour sensibiliser"
        kind="primary"
        markup="a"
        href="/selection-enseignants#sensibiliser"
        target="_blank"
      ></dsfr-button>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;
  @use '@style/grille' as *;

  .poursuivez-en-classe {
    padding: 3.5rem 0 0;
  }

  @include a-partir-de(lg) {
    .corps {
      margin-inline: auto;
      max-width: taille-pour-colonnes(8);
    }
  }

  .corps {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    h2 {
      margin: 0;
    }

    p {
      margin: 0;
    }
  }

  .illustration-sensibilisation {
    display: block;
    height: auto;
    width: 100%;
  }

  dsfr-highlight p {
    margin: 0;
  }
</style>
