<svelte:options customElement={{ tag: 'dsc-mes-jeux', shadow: 'none' }} />

<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { clic } from '../actions.svelte';
  import CarteJeu from '../cyber-en-jeux/CarteJeu.svelte';
  import InvitationARejoindre from '../cyber-en-jeux/InvitationARejoindre.svelte';
  import type { Jeu } from './jeu';

  let listeDesJeux: Jeu[] = $state([]);
  let chargementEnCours = $state(false);
  let jeuAjoute = $state(false);

  onMount(async () => {
    chargementEnCours = true;
    const reponse = await axios.get<Jeu[]>('/api/mes-jeux');
    listeDesJeux = reponse.data;
    chargementEnCours = false;
    jeuAjoute = new URLSearchParams(window.location.search).has('jeu-ajoute');
  });

  const deposeUnJeu = () => {
    window.location.assign('/nouveau-jeu');
  };

  const modifieVisibiliteJeu = async (jeu: Jeu) => {
    const { data: jeuModifie } = await axios.patch<Jeu>(`/api/jeux/${jeu.id}`, {
      estCache: !jeu.estCache,
    });
    const indexJeuModifie = listeDesJeux.findIndex((j) => j.id === jeu.id);
    if (indexJeuModifie > -1) {
      listeDesJeux.splice(indexJeuModifie, 1, jeuModifie);
    }
  };
</script>

<dsfr-container>
  {#if chargementEnCours}
    <p class="fr-text">Chargement...</p>
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
        <CarteJeu
          id={jeu.id}
          nom={jeu.nom}
          thematiques={[]}
          nomEtablissement={jeu.nomEtablissement}
          eleves={jeu.eleves || []}
          cheminCouverture={jeu.photos.couverture.chemin}
          estCache={jeu.estCache}
          modifieVisibiliteJeu={async () => {
            await modifieVisibiliteJeu(jeu);
          }}
          reactions={jeu.reactions}
          estModifiable
        />
      {/each}
    </div>
  {:else}
    <div class="pas-de-jeu">
      <div class="encart">
        <h4>Valorisez la créativité de vos élèves</h4>
        <p class="fr-text">
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
      <InvitationARejoindre />
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
