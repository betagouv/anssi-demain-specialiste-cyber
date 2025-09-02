<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { lesRessourcesCyberTriees, lesSelectionsDesRessourcesCyber } from './ressourceCyber';
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { ressourcesCyberStore } from './stores/ressourcesCyber.store';
  import { ressourcesCyberFiltre } from './stores/ressourcesCyberFiltre.store';

  let selections: string[] = [];

  onMount(async () => {
    const reponse = await fetch('/api/ressources-cyber');
    const ressourcesCyber = lesRessourcesCyberTriees(await reponse.json());
    selections = lesSelectionsDesRessourcesCyber(ressourcesCyber);
    ressourcesCyberStore.initialise(ressourcesCyber);
  });
</script>

<h3>Catalogue des ressources cyber</h3>

<div class="catalogue">
  <div class="filtres">
    <p>Filtres</p>
    <fieldset>
      <legend>Thématique Cyber</legend>
      <label>
        <select bind:value={$rechercheParThematique}>
          <option value="">Toutes les thématiques</option>
          {#each $ressourcesCyberFiltre.thematiques as thematique}
            <option value={thematique}>{thematique}</option>
          {/each}
        </select>
      </label>
    </fieldset>
    <fieldset>
      <legend>Sélection</legend>
      <ul>
        {#each selections as selection}
          <li>
            <label>
              <input type="checkbox" value={selection} />
              <span>{selection}</span>
            </label>
          </li>
        {/each}
      </ul>
    </fieldset>
  </div>

  <div class="conteneur">
    {#each $ressourcesCyberFiltre.resultat as { id, titre } (id)}
      <div id={`${id}`}>{titre}</div>
    {:else}
      <p>Chargement...</p>
    {/each}
  </div>
</div>

<style lang="scss">
  .catalogue {
    display: grid;
    gap: 1rem;
    grid-template-columns: 300px 1fr;
  }

  .conteneur {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
