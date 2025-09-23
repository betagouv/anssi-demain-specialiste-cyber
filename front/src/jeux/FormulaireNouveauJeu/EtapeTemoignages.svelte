<script lang="ts">
  import { clic } from '../../actions.svelte';
  import { jeuEnEditionStore } from '../stores/jeuEnEdition.store';

  const ajouteTemoignage = () => {
    $jeuEnEditionStore.temoignages ??= [];
    $jeuEnEditionStore.temoignages.push({ prenom: '', details: '' });
  };

  const supprimeTemoignage = (index: number) => {
    $jeuEnEditionStore.temoignages = $jeuEnEditionStore.temoignages?.toSpliced(
      index,
      1,
    );
  };
</script>

<p>
  <strong>Cette étape est facultative.</strong> Néanmoins votre témoignage, tout
  comme celui de vos élèves, peut inspirer d’autres enseignants à organiser CyberEnJeux
  pour faire découvrir la cybersécurité à leurs élèves.
</p>
{#if $jeuEnEditionStore.temoignages}
  {#each $jeuEnEditionStore.temoignages as temoignage, index}
    <div class="temoignage">
      <div class="prenom">
        <dsfr-input
          label="Prénom"
          id="prenom-temoignage-{index}"
          value={temoignage.prenom}
          onvaluechanged={(e: CustomEvent) => (temoignage.prenom = e.detail)}
        ></dsfr-input>
      </div>
      <dsfr-textarea
        id="temoignage-{index}"
        value={temoignage.details}
        onvaluechanged={(e: CustomEvent) => (temoignage.details = e.detail)}
        label="Témoignage"
      ></dsfr-textarea>
    </div>
    <div class="actions">
      <dsfr-button
        label="Supprimer"
        kind="tertiary-no-outline"
        hasIcon="true"
        icon="delete-bin-line"
        use:clic={() => supprimeTemoignage(index)}
      ></dsfr-button>
    </div>
    <hr />
  {/each}
{/if}
<div class="actions">
  <dsfr-button
    label="Ajouter un témoignage"
    kind="secondary"
    hasIcon="true"
    icon="add-line"
    use:clic={ajouteTemoignage}
  ></dsfr-button>
</div>

<style lang="scss">
  @use '../../points-de-rupture' as *;
  p {
    margin-bottom: 0.5rem;
  }

  hr {
    align-self: stretch;
    height: 1px;
    border: 0;
    background-color: #dddddd;
    margin: 0.5rem 0;
  }

  .temoignage {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .prenom {
      display: grid;
      grid-template-columns: 1fr;
    }
    @include a-partir-de(sm) {
      .prenom {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  .actions {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
  }
</style>
