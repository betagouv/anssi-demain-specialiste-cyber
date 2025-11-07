<script lang="ts">
  import { clic } from '../actions.svelte';
  import { enumerationFrancaise } from '../jeu.type';
  import { type Jeu } from '../jeux/jeu';
  import Reactions from '../jeux/Reactions.svelte';
  import BadgesThematiques from './BadgesThematiques.svelte';

  type Props = {
    jeu: Pick<
      Jeu,
      | 'id'
      | 'nom'
      | 'eleves'
      | 'nomEtablissement'
      | 'thematiques'
      | 'photos'
      | 'estCache'
      | 'reactions'
    >;
    estModifiable?: boolean;
    modifieVisibiliteJeu: () => Promise<void>;
  };

  const { jeu, modifieVisibiliteJeu, estModifiable = false }: Props = $props();

  const {
    id,
    nom,
    eleves,
    nomEtablissement,
    thematiques,
    photos,
    estCache,
    reactions,
  } = $derived(jeu);
</script>

<div class="lab-anssi-carte-jeux">
  {#if estModifiable}
    <div class="lab-anssi-carte-jeux__header">
      <div class="lab-anssi-carte-jeux__actions">
        <dsfr-button
          size="sm"
          kind="tertiary-no-outline"
          label="Modifier"
          hasIcon
          icon="edit-line"
          markup="a"
          href={`/modification-jeu/${id}`}
        ></dsfr-button>
        <dsfr-dropdown
          align="right"
          collapseId="dropdown-collapse-id"
          id="dropdown-id"
          buttonTitle="Choisir une option"
          buttonKind="tertiary-no-outline"
          buttonSize="sm"
          buttonIcon="more-line"
          buttonIconPlace="only"
        >
          <dsfr-toggle
            left
            label="Masquer de la vitrine des jeux"
            id="toggleExemple"
            checked={estCache}
            onvaluechanged={modifieVisibiliteJeu}
            use:clic={(e: Event) => {
              e.stopPropagation();
            }}
          ></dsfr-toggle>
        </dsfr-dropdown>
      </div>

      {#if estCache}
        <p class="lab-anssi-carte-jeux__masque">
          <lab-anssi-icone nom="eye-off-line"></lab-anssi-icone>
          Masqué de la vitrine des jeux
        </p>
      {/if}
    </div>
  {/if}

  <dsfr-card
    title={nom}
    description="Élaboré par {enumerationFrancaise(eleves)}"
    href={`/jeux/${id}`}
    src={photos.couverture.chemin}
    hasHeaderBadge
    hasDetailStartIcon
    detailStartIcon="map-pin-2-line"
    hasDetailStart
    detailStart={nomEtablissement}
  >
    {#if thematiques && thematiques.length > 0}
      <div slot="headerbadges">
        <BadgesThematiques {thematiques} taille="sm" />
      </div>
    {/if}
  </dsfr-card>
  <div class="lab-anssi-carte-jeux__reactions">
    <Reactions
      idJeu={id}
      reactionsDuJeu={reactions}
      variant="tertiaire-sans-bordure"
    />
  </div>
</div>

<style lang="scss">
  .lab-anssi-carte-jeux {
    display: flex;
    flex-direction: column;
    &__header,
    &__reactions {
      border: 1px solid #dddddd;
    }

    &__header {
      border-bottom-width: 0;
    }

    &__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 3px;
    }

    &__masque {
      background-color: #e8edff;
      display: flex;
      align-items: center;
      gap: 4px;
      color: #0063cb;
      font-size: 12px;
      line-height: 20px;
      padding: 4px 8px;
      margin-block: 0;
    }

    &__reactions {
      border-top-width: 0;
      padding: 5px;
    }

    dsfr-card {
      flex: 1;
    }
  }
</style>
