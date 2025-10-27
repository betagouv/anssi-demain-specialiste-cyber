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

  onMount(async () => {
    const reponse = await axios.get<Selection[]>(`/api/selections-${cible}`);
    selections = reponse.data;
    window.addEventListener('hashchange', changeSectionActive);
    changeSectionActive();
  });
</script>

<dsfr-container>
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
      <div class="conteneur" class:fonce={selection.couleurDeFond}>
        <hgroup>
          <h2>{selection.titre}</h2>
          <p class="fr-text--lg">{selection.explication}</p>
        </hgroup>
        <div>
          <h4>Ressources</h4>
          <div class="ressources">
            {#each selection.ressources as ressource}
              <CarteCatalogue {ressource} />
            {/each}
          </div>
        </div>
      </div>
    </dsfr-container>
  </section>
{/each}

<style lang="scss">
  @use '../points-de-rupture' as *;

  lab-anssi-ancres {
    display: block;
    margin-top: 2rem;
  }

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
