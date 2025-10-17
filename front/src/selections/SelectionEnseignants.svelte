<svelte:options
  customElement={{
    tag: 'dsc-selection-enseignants',
    shadow: 'none',
    props: {},
  }}
/>

<script lang="ts">
  import CarteCatalogue from '../catalogue/CarteCatalogue.svelte';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import type { RessourceCyber } from '../catalogue/ressourceCyber';

  type SelectionEnseignant = {
    id: string;
    titre: string;
    explication: string;
    couleurDeFond: undefined | string;
    ressources: RessourceCyber[];
  };

  let selections: SelectionEnseignant[] = [];

  onMount(async () => {
    const reponse = await axios.get<SelectionEnseignant[]>(
      '/api/selections-enseignants',
    );
    selections = reponse.data;
  });
</script>

{#each selections as selection}
  <section
    class={selection.id}
    style:background-color={selection.couleurDeFond
      ? `var(--${selection.couleurDeFond})`
      : ''}
  >
    <dsfr-container>
      <div class="conteneur" class:fonce={selection.couleurDeFond}>
        <hgroup>
          <h2>{selection.titre}</h2>
          <p>{selection.explication}</p>
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
