<svelte:options customElement={{ tag: 'dsc-mes-jeux', shadow: 'none' }} />

<script lang="ts">
  import type { Jeu } from './jeu';
  import { onMount } from 'svelte';
  import axios from 'axios';

  let listeDesJeux: Jeu[] = $state([]);
  let chargementEnCours = $state(false);

  onMount(async () => {
    chargementEnCours = true;
    const reponse = await axios.get('/api/jeux');
    listeDesJeux = reponse.data;
    chargementEnCours = false;
  });

  const deposeUnJeu = () => {
    window.location.assign('/nouveau-jeu');
  };
</script>

<dsfr-container>
  {#if chargementEnCours}
    <p>Chargement...</p>
  {/if}
  {#if listeDesJeux.length > 0}
    <div class="zone-action">
      <dsfr-button
        label="Déposer un jeu"
        kind="secondary"
        onclick={deposeUnJeu}
        role="button"
        onkeydown={deposeUnJeu}
        tabindex={0}
      ></dsfr-button>
    </div>
    <div class="jeux">
      {#each listeDesJeux as jeu (jeu.id)}
        <dsfr-card
          title={jeu.nom}
          description="Description texte SM regular Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat mauris nunc congue. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra."
          href={`/mes-jeux/${jeu.id}`}
          src="/assets/images/image-generique.svg"
          hasHeaderBadge={true}
        >
          <dsfr-badges-group
            slot="headerbadges"
            badges={[{ label: 'Thématique cyber', accent: 'purple-glycine' }]}
            size="sm"
          ></dsfr-badges-group>
        </dsfr-card>
      {/each}
    </div>
  {:else}
    <div class="pas-de-jeu">
      <h4>Valorisez la créativité de vos élèves</h4>
      <p>
        Partagez les jeux élaborés par vos élèves lors de séquence CyberEnJeux.
      </p>
      <dsfr-button
        label="Déposer un jeu"
        onclick={deposeUnJeu}
        role="button"
        onkeydown={deposeUnJeu}
        tabindex={0}
      ></dsfr-button>
    </div>
    <div>
      <span>
        Rejoignez la communauté CyberEnJeux pour poser vos questions ou partager
        votre expérience. Rejoindre la communauté
      </span>
    </div>
  {/if}
</dsfr-container>

<style lang="scss">
  @use '../points-de-rupture' as *;

  .zone-action {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
  }

  .jeux {
    display: grid;
    gap: 1rem;

    @include a-partir-de(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include a-partir-de(md) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include a-partir-de(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .pas-de-jeu {
    align-items: center;
    align-self: stretch;
    background: #f5f5fe;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
  }
</style>
