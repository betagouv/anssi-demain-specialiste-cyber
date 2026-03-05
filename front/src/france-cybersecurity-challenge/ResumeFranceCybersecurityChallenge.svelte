<script lang="ts">
  const tuiles = [
    {
      titre: 'Plusieurs dizaines d’épreuves nouvelles chaque année',
      illustration: { lien: '/assets/images/fcsc/ide-code.svg', alt: '' },
    },
    {
      titre: 'Un challenge entièrement à distance',
      illustration: { lien: '/assets/images/fcsc/utilisateur-pc.svg', alt: '' },
    },
    {
      titre: 'Des épreuves adaptées aux débutants comme aux spécialistes',
      illustration: {
        lien: '/assets/images/fcsc/utilisateur-bol.svg',
        alt: '',
      },
    },
  ];
</script>

<dsfr-container>
  <div class="participe">
    <h2>Participe au France Cybersecurity Challenge !</h2>
    <p class="texte-article-lg">
      Chaque année plusieurs milliers de personnes participent au France
      Cybersecurity Challenge (FCSC). Organisé par l'Agence nationale de la
      sécurité des systèmes d'information (ANSSI), le FCSC est ouvert à toutes
      et tous. Les participant(e)s de 14 à 25 ans qui le souhaitent peuvent
      tenter d'être sélectionné(e)s pour rejoindre la Team France et participer
      au challenge européen.
    </p>
    <lab-anssi-carrousel-tuiles>
      {#each tuiles as tuile, index (index)}
        <dsfr-tile
          title={tuile.titre}
          action-markup="false"
          no-link
          markupLevel="2"
        >
          <img
            src={tuile.illustration.lien}
            alt={tuile.illustration.alt}
            slot="pictogram"
          />
        </dsfr-tile>
      {/each}
    </lab-anssi-carrousel-tuiles>
    <dsfr-button
      href="https://fcsc.fr/fr/"
      label="Participer au challenge"
      markup="a"
      target="_blank"
    >
    </dsfr-button>
  </div>
</dsfr-container>

<style lang="scss">
  @use '@style/points-de-rupture' as *;
  @use '@style/grille' as *;

  .participe {
    margin: 0 auto;
    padding: 3rem 0 4.5rem;
    text-align: center;

    @include a-partir-de(lg) {
      max-width: taille-pour-colonnes(10);
    }

    @include a-partir-de(xl) {
      max-width: taille-pour-colonnes(8);
    }

    lab-anssi-carrousel-tuiles {
      display: block;
      margin-top: 3rem;
    }
  }

  dsfr-tile {
    scroll-snap-align: center;
    flex-shrink: 0;
    min-width: 235px;
    width: calc(33% - 14px);
  }
</style>
