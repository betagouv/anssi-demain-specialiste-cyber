<svelte:options
  customElement={{
    tag: 'dsc-selection-enseignants',
    shadow: 'none',
    props: {},
  }}
/>

<script lang="ts">
  import CarteCatalogue from '../catalogue/CarteCatalogue.svelte';
</script>

<section class="former">
  <dsfr-container>
    <h2>Former</h2>
    <p>
      Formez vos élèves à la cybersécurité grâce au kit pédagogique CyberEnjeux
      et à la présentation.
    </p>
    <h4>Ressources</h4>
    <div class="ressources">
      <CarteCatalogue
        ressource={{
          id: 1,
          titre: 'Titre',
          description:
            'Titre lorem ipsum dolor sit amet, consectetur adipiscing elit',
          urlIllustration: '/assets/images/image-generique.svg',
          besoins: [],
          niveaux: [],
          types: [],
          publicsCible: [],
          thematiques: [],
          lienExterne: '#',
          estCertifiee: false,
        }}
      />
      <CarteCatalogue
        ressource={{
          id: 1,
          titre: 'Titre',
          description:
            'Titre lorem ipsum dolor sit amet, consectetur adipiscing elit',
          urlIllustration: '/assets/images/image-generique.svg',
          besoins: [],
          niveaux: [],
          types: [],
          publicsCible: [],
          thematiques: [],
          lienExterne: '#',
          estCertifiee: false,
        }}
      />
      <CarteCatalogue
        ressource={{
          id: 1,
          titre: 'Titre',
          description:
            'Titre lorem ipsum dolor sit amet, consectetur adipiscing elit',
          urlIllustration: '/assets/images/image-generique.svg',
          besoins: [],
          niveaux: [],
          types: [],
          publicsCible: [],
          thematiques: [],
          lienExterne: '#',
          estCertifiee: false,
        }}
      />
    </div>
  </dsfr-container>
</section>
<section class="sensibiliser">
  <dsfr-container>
    <div class="fonce">
      <h2>Sensibiliser</h2>
      <p>Des ressources pour pouvoir parler de la cyber à vos élèves.</p>
      <h4>Ressources</h4>
      <div class="ressources">
        <CarteCatalogue
          ressource={{
            id: 1,
            titre: 'Titre',
            description:
              'Titre lorem ipsum dolor sit amet, consectetur adipiscing elit',
            urlIllustration: '/assets/images/image-generique.svg',
            besoins: [],
            niveaux: [],
            types: [],
            publicsCible: [],
            thematiques: [],
            lienExterne: '#',
            estCertifiee: false,
          }}
        />
        <CarteCatalogue
          ressource={{
            id: 1,
            titre: 'Titre',
            description:
              'Titre lorem ipsum dolor sit amet, consectetur adipiscing elit',
            urlIllustration: '/assets/images/image-generique.svg',
            besoins: [],
            niveaux: [],
            types: [],
            publicsCible: [],
            thematiques: [],
            lienExterne: '#',
            estCertifiee: false,
          }}
        />
        <CarteCatalogue
          ressource={{
            id: 1,
            titre: 'Titre',
            description:
              'Titre lorem ipsum dolor sit amet, consectetur adipiscing elit',
            urlIllustration: '/assets/images/image-generique.svg',
            besoins: [],
            niveaux: [],
            types: [],
            publicsCible: [],
            thematiques: [],
            lienExterne: '#',
            estCertifiee: false,
          }}
        />
      </div>
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  section {
    padding: 3.5rem 0;

    h2 {
      margin-bottom: 0.75rem;
    }

    p {
      margin: 0 0 1.5rem;
    }

    h4 {
      margin-top: 0.5rem;
    }

    .ressources {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &.sensibiliser {
      background-color: var(--pink-tuile-sun-425-moon-750);
    }
  }
</style>
