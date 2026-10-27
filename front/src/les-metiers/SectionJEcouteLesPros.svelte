<script lang="ts">
  import { onMount } from 'svelte';

  type FamillePortrait =
    | 'pilotage'
    | 'conception'
    | 'incidents-et-crises'
    | 'conseil-et-recherche'
    | 'metiers-connexes';

  type Portrait = {
    nom: string;
    metier: string;
    famille: FamillePortrait;
    image: string;
  };

  type TagFiltre = {
    id: string;
    label: string;
  };

  let familleActive: FamillePortrait = $state('incidents-et-crises');
  let femmesCyberUniquement: boolean = $state(false);
  let tagsGroupEl: HTMLElement | undefined = $state();

  const tagsFiltres: TagFiltre[] = [
    { id: 'pilotage', label: 'Pilotage (3)' },
    { id: 'conception', label: 'Conception (2)' },
    { id: 'incidents-et-crises', label: 'Incidents et crises (6)' },
    { id: 'conseil-et-recherche', label: 'Conseils et recherche (6)' },
    { id: 'metiers-connexes', label: 'Métiers connexes (3)' },
  ];

  const portraits: Portrait[] = [
    {
      nom: 'Stéphanie Ledoux',
      metier: 'Gestionnaire de crise cyber',
      famille: 'incidents-et-crises',
      image: '/assets/images/les-metiers/portrait-stephanie-ledoux.png',
    },
    {
      nom: 'Archibald Thirion',
      metier: 'Analyste SOC (security operation center)',
      famille: 'incidents-et-crises',
      image: '/assets/images/les-metiers/portrait-archibald-thirion.png',
    },
    {
      nom: 'Chloé Maque',
      metier: 'Premier-maître, analyste forensique systèmes',
      famille: 'incidents-et-crises',
      image: '/assets/images/les-metiers/portrait-chloe-maque.png',
    },
    {
      nom: 'Thibault Seret',
      metier: 'Analyste de la menace en cybersécurité',
      famille: 'incidents-et-crises',
      image: '/assets/images/les-metiers/portrait-thibault-seret.png',
    },
    {
      nom: 'Marine Martin',
      metier: "Responsable de l'équipe réponse aux incidents",
      famille: 'incidents-et-crises',
      image: '/assets/images/les-metiers/portrait-marine-martin.png',
    },
    {
      nom: 'Tristan Manzano',
      metier: 'Analyste réponse aux incidents de sécurité',
      famille: 'incidents-et-crises',
      image: '/assets/images/les-metiers/portrait-tristan-manzano.png',
    },
  ];

  let portraitsFiltres = $derived(
    portraits.filter((p) => p.famille === familleActive),
  );

  function synchroniseTagsActifs() {
    const racine = tagsGroupEl?.shadowRoot;
    if (!racine) return;
    const boutons = racine.querySelectorAll('button.fr-tag');
    boutons.forEach((btn) => {
      btn.setAttribute('aria-pressed', (btn.id === familleActive).toString());
    });
  }

  function gereSelection(e: CustomEvent<string>) {
    familleActive = e.detail as FamillePortrait;

    synchroniseTagsActifs();
  }

  function gereDeselection() {
    synchroniseTagsActifs();
  }

  onMount(() => {
    synchroniseTagsActifs();
  });
</script>

<dsfr-container id="j-ecoute-les-pros">
  <div class="j-ecoute-les-pros">
    <div class="j-ecoute-les-pros-entete">
      <h3 class="fr-h2">20 pros te racontent leur métier</h3>
      <p class="j-ecoute-les-pros-chapeau texte-article-lg">
        Dix femmes et dix hommes, de 28 à 59 ans, en entreprise, à l'hôpital,
        dans l'armée ou à leur compte&nbsp;: les portraits du Zoom Onisep,
        classés par famille de métiers.
      </p>
    </div>

    <div class="j-ecoute-les-pros-filtres">
      <dsfr-tags-group
        bind:this={tagsGroupEl}
        type="pressable"
        tags={tagsFiltres}
        group-markup="div"
        onselected={gereSelection}
        onunselected={gereDeselection}
      ></dsfr-tags-group>
    </div>

    <div class="j-ecoute-les-pros-grille">
      {#each portraitsFiltres as portrait, index}
        <dsfr-card
          title={portrait.nom}
          has-tag
          has-detail-end
          detail-end="Accéder au témoignage"
          size="md"
          src={portrait.image}
          href="https://www.onisep.fr/les-metiers-de-la-cybersecurite"
          enlarge
          blank
        >
          <dsfr-tags-group
            slot="tagsgroup"
            tags={[{ id: `tag-${index}`, label: `${portrait.metier}` }]}
            size="sm"
            group-markup="div"
          ></dsfr-tags-group>
        </dsfr-card>
      {/each}
    </div>
  </div>
</dsfr-container>

<style lang="scss">
  @use '../../src/style/points-de-rupture' as *;

  .j-ecoute-les-pros {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-chapeau {
      margin-block-end: 0;
    }

    &-filtres {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    &-grille {
      display: grid;
      gap: 1.5rem;

      @include a-partir-de(md) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include a-partir-de(lg) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
</style>
