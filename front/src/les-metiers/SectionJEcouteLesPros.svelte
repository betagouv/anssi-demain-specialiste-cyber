<script lang="ts">
  import axios from 'axios';
  import { onMount, tick } from 'svelte';
  import { compteFonctionsParFamille, famillesUniques, type FonctionMetier } from './fonctionMetier.type';
  import { fonctionsMetierStore } from './stores/fonctionsMetier.store';

  let chargementEnCours = $state(false);
  let erreurChargement = $state(false);
  let fonctions: FonctionMetier[] = $state([]);
  let familleActive: string = $state('');
  let filtreFemmes = $state(false);
  let tagsGroupEl: HTMLElement | undefined = $state();

  fonctionsMetierStore.subscribe((valeur) => {
    fonctions = valeur;
  });

  let fonctionsVisibles = $derived(filtreFemmes ? fonctions.filter((f) => f.témoignage.femme) : fonctions);
  let comptesParFamille = $derived(compteFonctionsParFamille(fonctionsVisibles));
  let familles = $derived(famillesUniques(fonctionsVisibles));

  let tagsFiltres = $derived(
    familles.map((famille) => ({
      id: famille,
      label: `${famille} (${comptesParFamille.get(famille) ?? 0})`,
    })),
  );

  let fonctionsFiltrees = $derived(fonctionsVisibles.filter((f) => f.famille === familleActive));

  function synchroniseTagsActifs() {
    const racine = tagsGroupEl?.shadowRoot;
    if (!racine) return;
    const boutons = racine.querySelectorAll('button.fr-tag');
    boutons.forEach((btn) => {
      btn.setAttribute('aria-pressed', (btn.id === familleActive).toString());
    });
  }

  $effect(() => {
    if (familles.length > 0 && !familles.includes(familleActive)) {
      familleActive = familles[0];
    }
  });

  function gereSelection(e: CustomEvent<string>) {
    familleActive = e.detail;
    synchroniseTagsActifs();
  }

  function gereDeselection() {
    synchroniseTagsActifs();
  }

  onMount(async () => {
    chargementEnCours = true;
    try {
      const reponse = await axios.get<FonctionMetier[]>('/api/fonctions');
      fonctionsMetierStore.initialise(reponse.data);
    } catch (e) {
      erreurChargement = true;
      console.error(e);
    } finally {
      chargementEnCours = false;
    }

    await tick();
    requestAnimationFrame(() => synchroniseTagsActifs());
  });
</script>

<dsfr-container id="jecoute-les-pros">
  <div class="jecoute-les-pros">
    <div class="jecoute-les-pros-entete">
      <h3 class="fr-h2">20 pros te racontent leur métier</h3>
      <p class="jecoute-les-pros-chapeau texte-article-lg">
        Dix femmes et dix hommes, de 28 à 59 ans, en entreprise, à l'hôpital, dans l'armée ou à leur compte&nbsp;: les
        portraits du Zoom Onisep, classés par famille de métiers.
      </p>
    </div>

    {#if chargementEnCours}
      <div class="jecoute-les-pros-chargement">
        <dsfr-alert title="Chargement des portraits…" type="info"></dsfr-alert>
      </div>
    {:else if erreurChargement}
      <dsfr-alert
        title="Erreur de chargement"
        type="error"
        has-description
        text="Impossible de charger les portraits. Veuillez réessayer ultérieurement."
      ></dsfr-alert>
    {:else}
      <div class="jecoute-les-pros-filtres">
        <dsfr-tags-group
          bind:this={tagsGroupEl}
          type="pressable"
          tags={tagsFiltres}
          group-markup="div"
          onselected={gereSelection}
          onunselected={gereDeselection}
        ></dsfr-tags-group>

        <dsfr-checkbox
          id="filtre-femmes-cyber"
          label="Les femmes de la cyber"
          size="sm"
          checked={filtreFemmes ? 'true' : undefined}
          onvaluechanged={() => (filtreFemmes = !filtreFemmes)}
        ></dsfr-checkbox>
      </div>

      <div class="jecoute-les-pros-grille">
        {#each fonctionsFiltrees as fonction, index}
          <dsfr-card
            title={fonction.témoignage.nom}
            has-tag
            has-detail-end
            detail-end="Accéder au témoignage"
            size="md"
            src={fonction.témoignage.illustration}
            href={fonction.témoignage.lien}
            enlarge
            blank
          >
            <dsfr-tags-group
              slot="tagsgroup"
              tags={[{ id: `tag-${index}`, label: fonction.nom }]}
              size="sm"
              group-markup="div"
            ></dsfr-tags-group>
          </dsfr-card>
        {/each}
      </div>
    {/if}
  </div>
</dsfr-container>

<style lang="scss">
  @use '../../src/style/points-de-rupture' as *;

  .jecoute-les-pros {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-chapeau {
      margin-block-end: 0;
    }

    &-filtres {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: space-between;

      dsfr-checkbox {
        margin-inline-start: auto;
      }
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
