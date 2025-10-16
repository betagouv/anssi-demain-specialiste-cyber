<svelte:options
  customElement={{
    tag: 'dsc-selection-enseignants',
    shadow: 'none',
    props: {},
  }}
/>

<script lang="ts">
  import CarteCatalogue from '../catalogue/CarteCatalogue.svelte';

  const sections = [
    {
      id: 'former',
      titre: 'Former',
      description:
        'Formez vos élèves à la cybersécurité grâce au kit pédagogique CyberEnjeux et à la présentation.',
      couleurDeFond: undefined,
    },
    {
      id: 'sensibiliser',
      titre: 'Sensibiliser',
      description:
        'Des ressources pour pouvoir parler de la cyber à vos élèves.',
      couleurDeFond: 'pink-tuile-sun-425-moon-750',
    },
    {
      id: 'orienter',
      titre: 'Orienter',
      description:
        'L’ANSSI répertorie toutes les formations cyber labelisées, n’hésitez pas à en prendre connaissances pour en parler à vos élèves.',
      couleurDeFond: undefined,
    },
    {
      id: 'se-former',
      titre: 'Se former',
      description:
        'Trouvez des formations sur le numérique et la cybersécurité pour développer vos compétences et renforcer vos connaissances dans un domaine en constante évolution.',
      couleurDeFond: 'bleu-profond-dsc',
    },
  ];
</script>

{#each sections as section}
  <section
    class={section.id}
    style:background-color={section.couleurDeFond
      ? `var(--${section.couleurDeFond})`
      : ''}
  >
    <dsfr-container>
      <div class="conteneur" class:fonce={section.couleurDeFond}>
        <hgroup>
          <h2>{section.titre}</h2>
          <p>{section.description}</p>
        </hgroup>
        <div>
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
      </div>
    </dsfr-container>
  </section>
{/each}

<style lang="scss">
  @use '../points-de-rupture' as *;

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

      @include a-partir-de(sm) {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      @include a-partir-de(md) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @include a-partir-de(lg) {
      .conteneur {
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
        padding-bottom: 1rem;

        hgroup {
          flex: 0 0 282px;
        }
      }
    }
  }
</style>
