<svelte:options customElement={{ tag: 'dsc-mes-jeux', shadow: 'none' }} />

<script lang="ts">
  import type { Jeu } from './jeu';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { clic } from '../actions.svelte';
  import Citation from '../Citation.svelte';

  let listeDesJeux: Jeu[] = $state([]);
  let chargementEnCours = $state(false);
  let jeuAjoute = $state(false);

  onMount(async () => {
    chargementEnCours = true;
    const reponse = await axios.get('/api/jeux');
    listeDesJeux = reponse.data;
    chargementEnCours = false;
    jeuAjoute = new URLSearchParams(window.location.search).has('jeu-ajoute');
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
        hasIcon="true"
        icon="add-line"
        use:clic={deposeUnJeu}
      ></dsfr-button>
    </div>
    {#if jeuAjoute}
      <dsfr-alert
        hasTitle={false}
        text="Le jeu a bien été ajouté."
        type="success"
        size="sm"
        dismissible
        buttonCloseLabel="Masquer le message"
      ></dsfr-alert>
    {/if}
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
      <div class="encart">
        <h4>Valorisez la créativité de vos élèves</h4>
        <p>
          Partagez les jeux élaborés par vos élèves lors de séquence
          CyberEnJeux.
        </p>
        <dsfr-button
          label="Déposer un jeu"
          hasIcon="true"
          icon="add-line"
          use:clic={deposeUnJeu}
        ></dsfr-button>
      </div>
      <Citation>
        Rejoignez la communauté CyberEnJeux pour poser vos questions ou partager
        votre expérience. <lab-anssi-lien
          cible="#"
          titre="Rejoindre la communauté"
          apparence="lien-texte"
          target="_blank"
        ></lab-anssi-lien>
      </Citation>
    </div>
  {/if}
</dsfr-container>

<style lang="scss">
  @use '../points-de-rupture' as *;

  dsfr-container {
    display: block;
    margin-bottom: 4.5rem;
  }

  .zone-action {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .jeux {
    display: grid;
    gap: 1rem;
    padding-bottom: 1rem;

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
    margin: 4.5rem auto 7.5rem;
    max-width: 524px;
    .encart {
      text-align: center;
      align-items: center;
      background: var(--blue-france-975-sun-113);
      display: flex;
      flex-direction: column;
      padding: 2rem;
      margin-bottom: 1.5rem;
      h4 {
        margin: 0;
      }
      p {
        margin: 0.5rem 0 2rem;
      }
    }
  }

  dsfr-alert {
    margin-bottom: 2rem;
    display: block;
    max-width: 792px;
  }
</style>
