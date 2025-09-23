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

<div class="note">
  <p>
    <strong>Cette étape est facultative.</strong> Néanmoins votre témoignage, tout
    comme celui de vos élèves, peut inspirer d’autres enseignants à organiser CyberEnJeux
    pour faire découvrir la cybersécurité à leurs élèves.
  </p>
  {#if $jeuEnEditionStore.temoignages}
    {#each $jeuEnEditionStore.temoignages as temoignage, index}
      <div class="temoignage">
        <dsfr-input
          label="Prénom"
          id="prenom-temoignage-{index}"
          value={temoignage.prenom}
          onvaluechanged={(e: CustomEvent) => (temoignage.prenom = e.detail)}
        ></dsfr-input>
        <dsfr-textarea
          id="temoignage-{index}"
          value={temoignage.details}
          onvaluechanged={(e: CustomEvent) => (temoignage.details = e.detail)}
          label="Témoignage"
        ></dsfr-textarea>
      </div>
      <dsfr-button
        label="Supprimer"
        kind="secondary"
        use:clic={() => supprimeTemoignage(index)}
      ></dsfr-button>
    {/each}
  {/if}
  <div class="actions">
    <dsfr-button
      label="Ajouter un témoignage"
      kind="secondary"
      use:clic={ajouteTemoignage}
    ></dsfr-button>
  </div>
</div>
