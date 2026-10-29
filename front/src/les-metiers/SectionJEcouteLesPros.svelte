<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import {
    compteFonctionsParFamille,
    famillesUniques,
    type FonctionMetier,
  } from './fonctionMetier.type';
  import { fonctionsMetierStore } from './stores/fonctionsMetier.store';

  let chargementEnCours = $state(false);
  let erreurChargement = $state(false);
  let fonctions: FonctionMetier[] = $state([]);
  let familleActive: string = $state('Incidents et crises');
  let tagsGroupEl: HTMLElement | undefined = $state();

  fonctionsMetierStore.subscribe((valeur) => {
    fonctions = valeur;
  });

  let comptesParFamille = $derived(compteFonctionsParFamille(fonctions));
  let familles = $derived(famillesUniques(fonctions));

  let tagsFiltres = $derived(
    familles.map((famille) => ({
      id: famille,
      label: `${famille} (${comptesParFamille.get(famille) ?? 0})`,
    })),
  );

  let fonctionsFiltrees = $derived(
    fonctions.filter((f) => f.famille === familleActive),
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
    familleActive = e.detail;
    synchroniseTagsActifs();
  }

  function gereDeselection() {
    synchroniseTagsActifs();
  }

  onMount(async () => {
    chargementEnCours = true;
    try {
      // TODO: remplacer par /api/fonctions quand l'API sera prête
      const reponse = await axios.get<FonctionMetier[]>(
        '/donnees/fonctions-metier.json',
      );
      fonctionsMetierStore.initialise(reponse.data);
    } catch (e) {
      erreurChargement = true;
      console.error(e);
    } finally {
      chargementEnCours = false;
    }

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

    {#if chargementEnCours}
      <div class="j-ecoute-les-pros-chargement">
        <p>Chargement des portraits…</p>
      </div>
    {:else if erreurChargement}
      <div class="j-ecoute-les-pros-erreur">
        <p>Impossible de charger les portraits.</p>
      </div>
    {:else}
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

  .j-ecoute-les-pros {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-chapeau {
      margin-block-end: 0;
    }

    &-chargement,
    &-erreur {
      display: flex;
      justify-content: center;
      padding: 2rem;
      color: var(--text-mention-grey);
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
