<script lang="ts">
  import { rechercheParPublicCible } from './stores/rechercheParPublicCible.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Public cible</legend>
  <ul>
    {#each $ressourcesCyberFiltrees.publicsCible as publicCible}
      <li>
        <dsfr-checkbox
          id={publicCible}
          label={publicCible}
          value={publicCible}
          name={$rechercheParPublicCible}
          onvaluechanged={(e: CustomEvent) =>
            ($rechercheParPublicCible = e.detail)}
        >
        </dsfr-checkbox>
      </li>
    {/each}
  </ul>
</fieldset>
