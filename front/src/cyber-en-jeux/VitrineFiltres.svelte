<script lang="ts">
  import RechercheTextuelle from '../RechercheTextuelle.svelte';
  import { clic } from '../actions.svelte';
  import FiltreCategorie from './FiltreCategorie.svelte';
  import FiltreNiveau from './FiltreNiveau.svelte';
  import FiltreThematique from './FiltreThematique.svelte';
  import { rechercheParCategorie } from './stores/rechercheParCategorie.store';
  import { rechercheParNiveau } from './stores/rechercheParNiveau.store';
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { rechercheTextuelle } from './stores/rechercheTextuelle.store';

  let menuContextuelEstOuvert = $state(false);

  const afficheLesFiltres = () => {
    menuContextuelEstOuvert = true;
  };

  const reinitialiseLesFiltres = () => {
    rechercheTextuelle.set('');
    rechercheParThematique.reinitialise();
    rechercheParCategorie.reinitialise();
    rechercheParNiveau.reinitialise();
  };

  const ferme = () => {
    menuContextuelEstOuvert = false;
  };
</script>

<div class="filtres">
  <RechercheTextuelle
    miseEnAvant="Rechercher un jeu"
    bind:recherche={$rechercheTextuelle}
  />
  <dsfr-button
    class="affiche-filtres"
    label="Voir les filtres"
    kind="secondary"
    use:clic={afficheLesFiltres}
  >
  </dsfr-button>

  <div class="filtres-conteneur" class:ouvert={menuContextuelEstOuvert}>
    <div class="filtres-entete" class:ouvert={menuContextuelEstOuvert}>
      <h4>Filtres</h4>
      <dsfr-button
        class="ferme-menu"
        label="Fermer"
        size="sm"
        kind="tertiary-no-outline"
        hasIcon="true"
        icon="close-line"
        iconPlace="right"
        use:clic={ferme}
      ></dsfr-button>
      <dsfr-button
        class="reinitialise-filtres"
        label="Réinitialiser les filtres"
        kind="tertiary"
        hasIcon="true"
        icon="close-circle-line"
        use:clic={reinitialiseLesFiltres}
      ></dsfr-button>
    </div>
    <div class="filtres-contenu" class:ouvert={menuContextuelEstOuvert}>
      <!-- <FiltreTri /> -->
      <FiltreThematique />
      <FiltreCategorie />
      <FiltreNiveau />
    </div>
    <div class="applique-filtres" class:ouvert={menuContextuelEstOuvert}>
      <dsfr-button
        label="Afficher les ressources"
        kind="primary"
        use:clic={ferme}
      ></dsfr-button>
    </div>
  </div>
</div>

<style lang="scss">
  @use '../points-de-rupture' as *;

  h4 {
    margin: 0 0 0.5rem;
  }

  .filtres {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    margin-bottom: 0.5rem;
    position: relative;
    width: 100%;

    .affiche-filtres {
      width: max-content;
    }

    .filtres-conteneur {
      background-color: #ffffff;
      box-sizing: border-box;
      display: grid;
      gap: 1rem;
      grid-template-columns: 100%;
      grid-template-rows: repeat(2, min-content) 1fr auto;
      height: 100vh;
      overflow-y: auto;
      padding: 1rem 1rem 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 5;

      .filtres-entete,
      .filtres-contenu,
      .applique-filtres {
        box-sizing: border-box;
        width: clamp(200px, 100%, 1200px);
      }

      &:not(.ouvert) {
        visibility: hidden;
      }

      .filtres-entete:not(.ouvert),
      .filtres-contenu:not(.ouvert),
      .applique-filtres:not(.ouvert) {
        display: none;
      }

      .filtres-entete {
        display: flex;
        flex-flow: column nowrap;
        gap: 0.5rem;

        .ferme-menu {
          align-self: flex-end;
          order: -1;
        }
      }

      .filtres-contenu {
        display: flex;
        flex-flow: column nowrap;
      }

      .applique-filtres {
        background: var(--white);
        border-top: 1px solid var(--border-default-grey);
        grid-row: -1;
        margin: 0 -1rem;
        padding: 1rem;
        position: sticky;
        bottom: 0;
        width: calc(100% + 2rem);
      }
    }

    :global .recherche-textuelle {
      display: block;
      margin: 3rem auto;
      width: clamp(200px, 100%, 588px);
    }
  }

  @include a-partir-de(md) {
    .filtres {
      .filtres-conteneur:not(.ouvert) {
        gap: 0;
        height: min-content;
        padding-top: 0;
        position: initial;
      }
    }
  }

  @include a-partir-de(lg) {
    .filtres {
      gap: 0 1rem;
      grid-column: 1 / span 4;
      grid-row: 1;
      grid-template-columns: repeat(4, minmax(200px, 1fr));
      grid-template-rows: repeat(2, min-content) 1fr;
      width: 100%;

      :global .recherche-textuelle {
        grid-column: 1;
        grid-row: 1;
        margin: 0 0 1rem;
      }

      .filtres-conteneur {
        grid-row: 2;
        padding: 0;
        position: relative;
      }

      .affiche-filtres {
        display: none;
      }

      .filtres-conteneur,
      .filtres-conteneur:not(.ouvert) {
        background: none;
        gap: 1rem;
        grid-column: 1;
        visibility: visible;
        width: auto;

        /* Permet d'afficher les "outline" lorsque des éléments intéractifs ont le focus */
        margin: 0 -4px;
        padding: 0 4px;

        .filtres-entete,
        .filtres-contenu {
          display: flex;
          flex-flow: column nowrap;
        }

        .filtres-entete {
          grid-row: 1;

          & > .ferme-menu {
            display: none;
          }
        }

        .filtres-contenu {
          grid-row: 2;
        }
      }
    }
  }
</style>
