<script lang="ts">
  import FiltreBesoin from './FiltreBesoin.svelte';
  import FiltreNiveau from './FiltreNiveau.svelte';
  import FiltrePublicCible from './FiltrePublicCible.svelte';
  import FiltreThematique from './FiltreThematique.svelte';
  import FiltreType from './FiltreType.svelte';
  import RechercheTextuelle from '../RechercheTextuelle.svelte';
  import { rechercheTextuelle } from './stores/rechercheTextuelle.store';
  import { rechercheParBesoin } from './stores/rechercheParBesoin.store';
  import { rechercheParPublicCible } from './stores/rechercheParPublicCible.store';
  import { rechercheParNiveau } from './stores/rechercheParNiveau.store';
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { rechercheParType } from './stores/rechercheParType.store';
  import { clic } from '../actions.svelte';

  let menuContextuelEstOuvert = $state(false);

  const afficheLesFiltres = () => {
    menuContextuelEstOuvert = true;
  };

  const reinitialiseLesFiltres = () => {
    rechercheTextuelle.set('');
    rechercheParBesoin.reinitialise();
    rechercheParNiveau.reinitialise();
    rechercheParPublicCible.reinitialise();
    rechercheParThematique.reinitialise();
    rechercheParType.reinitialise();
  };

  const ferme = () => {
    menuContextuelEstOuvert = false;
  };
</script>

<div class="filtres">
  <RechercheTextuelle
    bind:recherche={$rechercheTextuelle}
    miseEnAvant="Rechercher une ressource"
  />
  <dsfr-button
    class="affiche-filtres"
    label="Voir les filtres"
    kind="secondary"
    centered
    use:clic={afficheLesFiltres}
  >
  </dsfr-button>

  <div class="filtres-conteneur" class:ouvert={menuContextuelEstOuvert}>
    <div class="filtres-entete" class:ouvert={menuContextuelEstOuvert}>
      <p class="fr-h6">Filtres</p>
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
        centered
        disabled={!$rechercheTextuelle &&
          $rechercheParBesoin === '' &&
          $rechercheParNiveau.length === 0 &&
          $rechercheParPublicCible.length === 0 &&
          $rechercheParThematique === '' &&
          $rechercheParType.length === 0}
        use:clic={reinitialiseLesFiltres}
      ></dsfr-button>
    </div>
    <div class="filtres-besoins" class:ouvert={menuContextuelEstOuvert}>
      <FiltreBesoin />
    </div>
    <div class="filtres-contenu" class:ouvert={menuContextuelEstOuvert}>
      <FiltreThematique />
      <FiltrePublicCible />
      <FiltreType />
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
  @use '@style/points-de-rupture' as *;

  .fr-h6 {
    color: var(--text-title-grey);
    font-style: normal;
    font-weight: bold;
    margin-bottom: 0.5rem;
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
      overflow-x: hidden;
      overflow-y: auto;
      padding: 1rem 1rem 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      z-index: calc(var(--ground) + 751);

      .filtres-entete,
      .filtres-besoins,
      .filtres-contenu,
      .applique-filtres {
        box-sizing: border-box;
        width: clamp(200px, 100%, 1200px);
      }

      &:not(.ouvert) {
        visibility: hidden;
      }

      .filtres-entete:not(.ouvert),
      .filtres-besoins:not(.ouvert),
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
        background: #ffffff;
        border-top: 1px solid #dddddd;
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

        .filtres-besoins {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          transform: translateY(-146px); /* 146px = height of the div */
          visibility: visible;
          width: clamp(200px, 100%, 1200px);
        }
      }

      .filtres-conteneur.ouvert {
        .filtres-besoins {
          display: none;
        }
      }
    }
  }

  @include a-partir-de(lg) {
    .filtres {
      gap: 0 1.5rem;
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

        .filtres-besoins {
          grid-column: 1 / span 4;
          grid-row: 1;
          top: -3.5rem;
        }
      }
    }
  }

  @media (min-width: 1210px) {
    .filtres {
      .filtres-conteneur:not(.ouvert) {
        .filtres-besoins {
          transform: translateY(-120px); /* 120px = height of the div */
        }
      }
    }
  }
</style>
