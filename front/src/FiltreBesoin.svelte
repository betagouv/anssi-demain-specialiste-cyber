<script lang="ts">
  import { rechercheParBesoin } from './stores/rechercheParBesoin.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Besoin</legend>
  <ul>
    <li>
      <label>
        <input bind:group={$rechercheParBesoin} type="radio" value="" />
        <span>Tous les besoins</span>
      </label>
    </li>
    {#each $ressourcesCyberFiltrees.besoins as besoin}
      <li>
        <label>
          <input bind:group={$rechercheParBesoin} type="radio" value={besoin} />
          <span>{besoin}</span>
        </label>
      </li>
    {/each}
  </ul>
</fieldset>
