<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { lesRessourcesCyberTriees } from './ressourceCyber';
  import { rechercheParSelection } from './stores/rechercheParSelection.store';
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { ressourcesCyberStore } from './stores/ressourcesCyber.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';

  onMount(async () => {
    const reponse = await fetch('/api/ressources-cyber');
    const ressourcesCyber = lesRessourcesCyberTriees(await reponse.json());
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
          {#each $ressourcesCyberFiltrees.thematiques as thematique}
            <option value={thematique}>{thematique}</option>
          {/each}
        </select>
      </label>
    </fieldset>
    <fieldset>
      <legend>Sélection</legend>
      <ul>
        {#each $ressourcesCyberFiltrees.selections as selection}
          <li>
            <label>
              <input
                bind:group={$rechercheParSelection}
                type="checkbox"
                value={selection}
              />
              <span>{selection}</span>
            </label>
          </li>
        {/each}
      </ul>
    </fieldset>
  </div>

  <div class="conteneur">
    {#each $ressourcesCyberFiltrees.resultat as { id, titre } (id)}
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

  .filtres {
    select {
      width: 100%;
    }
  }
</style>
