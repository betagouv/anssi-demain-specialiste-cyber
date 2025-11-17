<svelte:options
  customElement={{
    tag: 'dsc-selection',
    shadow: 'none',
    props: {
      cible: { type: 'String' },
    },
  }}
/>

<script lang="ts">
  import CarteCatalogue from '../catalogue/CarteCatalogue.svelte';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import type { RessourceCyber } from '../catalogue/ressourceCyber';

  export let cible: 'enseignants' | 'eleves';

  type Selection = {
    id: string;
    titre: string;
    explication: string;
    couleurDeFond: undefined | string;
    ressources: RessourceCyber[];
  };

  let selections: Selection[] = [];
  $: ancres = selections.map((selection) => ({
    label: selection.titre,
    cible: `#${selection.id}`,
  }));
  let indexActif: number;

  const changeSectionActive = () => {
    indexActif = Math.max(
      selections.findIndex(
        (selection) => `#${selection.id}` === window.location.hash,
      ),
      0,
    );
  };

  const detecterSectionVisible = () => {
    const sections = document.querySelectorAll('section[id]');

    sections.forEach((section, i) => {
      const sectionRect = section.getBoundingClientRect();
      const scrollPosition = document.body.scrollTop;

      if (
        sectionRect.top <= scrollPosition &&
        sectionRect.bottom >= scrollPosition
      ) {
        indexActif = i;
        return;
      }
    });
  };

  onMount(async () => {
    const reponse = await axios.get<Selection[]>(`/api/selections-${cible}`);
    selections = reponse.data;
    window.addEventListener('hashchange', changeSectionActive);
    window.addEventListener('scroll', detecterSectionVisible);
    changeSectionActive();
  });
</script>

<dsfr-container class="dsc-conteneur-ancres">
  <lab-anssi-ancres {ancres} {indexActif}></lab-anssi-ancres>
</dsfr-container>

{#each selections as selection}
  <section
    id={selection.id}
    class={selection.id}
    style:background-color={selection.couleurDeFond
      ? `var(--${selection.couleurDeFond})`
      : ''}
  >
    <dsfr-container>
      <div class="conteneur" class:sombre={selection.couleurDeFond}>
        <hgroup>
          <h2>{selection.titre}</h2>
          <p class="fr-text--lg">{selection.explication}</p>
        </hgroup>
        <div>
          <h3 class="fr-h4">Ressources</h3>
          <div class="ressources">
            {#each selection.ressources as ressource}
              <CarteCatalogue {ressource} markup="h4" />
            {/each}
          </div>
        </div>
      </div>
    </dsfr-container>
  </section>
{:else}
  <section class="section-vide"></section>
  <section class="section-vide"></section>
  <section class="section-vide"></section>
{/each}

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .dsc-conteneur-ancres {
    background-color: var(--background-default-grey);
    position: sticky;
    top: 0;
    z-index: 2;
    padding-block: 1rem;
    margin-top: 1rem;
  }

  lab-anssi-ancres {
    display: block;
  }

  section {
    padding-block: 3.5rem;
    scroll-margin-top: 3.5rem;

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
