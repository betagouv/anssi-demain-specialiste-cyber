<svelte:options
  customElement={{
    tag: 'dsc-encart-declarer-action',
    shadow: 'none',
  }}
/>

<script lang="ts">
</script>

<div class="encart-declarer-action sombre">
  <div class="conteneur">
    <div class="contenu">
      <h2 class="fr-h3">Déclarer une action</h2>
      <p class="fr-text">
        Faites découvrir la cybersécurité autrement&nbsp;! En déclarant votre
        séquence, vous profitez d’un accompagnement et valorisez votre
        engagement pour une éducation au numérique plus ludique et
        participative.
      </p>
    </div>
    <div class="action">
      <dsfr-button
        label="Déclarer une action"
        kind="inverted-primary"
        target="_blank"
        href="https://grist.numerique.gouv.fr/o/docs/forms/pqCUgkBSQrZcpoTv8F9aCg/27"
        markup="a"
      ></dsfr-button>
    </div>
  </div>
</div>

<style lang="scss">
  @use '../points-de-rupture' as *;

  .encart-declarer-action {
    background:
      linear-gradient(
        90deg,
        var(--bleu-profond-dsc) 69.49%,
        rgb(from var(--bleu-profond-dsc) r g b/0) 100%
      ),
      url('/assets/images/cercles-fond-sombre.avif') right 20% no-repeat,
      var(--bleu-profond-dsc);
    color: var(--grey-1000-50);
    padding: 2rem;

    .conteneur {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-inline: auto;
      max-width: 996px;
    }

    .contenu,
    .action {
      flex: 1;
    }

    .fr-h3 {
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 0;
    }

    @include a-partir-de(lg) {
      .conteneur {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1.5rem;
      }

      .contenu {
        flex: 0 0 58.33333%;
        max-width: 58.33333%;
        width: 58.33333%;
        padding-bottom: 16px;
      }

      .action {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
