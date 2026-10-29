<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { accentPourFamille, type FamilleMetier } from './familleMetier.type';
  import { famillesMetierStore } from './stores/famillesMetier.store';

  let chargementEnCours = $state(false);
  let erreurChargement = $state(false);
  let familles: FamilleMetier[] = $state([]);

  famillesMetierStore.subscribe((valeur) => {
    familles = valeur;
  });

  onMount(async () => {
    chargementEnCours = true;
    try {
      // TODO: remplacer par /api/familles-metier quand l'API sera prête
      const reponse = await axios.get<FamilleMetier[]>(
        '/donnees/familles-metier.json',
      );
      famillesMetierStore.initialise(reponse.data);
    } catch (e) {
      erreurChargement = true;
      console.error(e);
    } finally {
      chargementEnCours = false;
    }
  });
</script>

<dsfr-container id="j-explore">
  <div class="j-explore">
    <div class="j-explore-entete">
      <h3 class="fr-h2">Cinq familles pour s'y retrouver</h3>
      <p class="j-explore-chapeau texte-article-lg">
        Les métiers de la cyber sont classés en grandes familles par l'ANSSI,
        l'agence nationale de la sécurité des systèmes d'information. L'Onisep a
        repris cette organisation pour ses portraits.
      </p>
    </div>

    {#if chargementEnCours}
      <div class="j-explore-chargement">
        <p>Chargement des familles de métiers…</p>
      </div>
    {:else if erreurChargement}
      <div class="j-explore-erreur">
        <p>Impossible de charger les familles de métiers.</p>
      </div>
    {:else}
      <div class="j-explore-familles">
        {#each familles as famille, index}
          {@const accent = accentPourFamille(famille.code)}
          <dsfr-card
            title={famille.titre}
            has-description
            description={famille.sousTitre}
            has-badge
            has-links
            no-icon
            size="lg"
            horizontal
            horizontal-proportion="tier"
            no-link
          >
            <div class={['j-explore-image', accent]} slot="image">
              <span class="j-explore-numero">{index + 1}</span>
            </div>
            <dsfr-badges-group
              slot="badgesgroup"
              badges={[{ label: famille.code, accent }]}
              size="sm"
            ></dsfr-badges-group>
            <dsfr-link
              slot="linksgroup"
              label="Explorer cette famille"
              href="#"
              size="md"
              has-icon
              icon="arrow-right-line"
              icon-place="right"
            ></dsfr-link>
          </dsfr-card>
        {/each}
      </div>
    {/if}

    <p class="j-explore-sources fr-text--xs">
      Sources&nbsp;: ANSSI, Panorama des métiers de la cybersécurité
      (2020)&nbsp;; Onisep, Zoom «&nbsp;Les métiers de la cybersécurité&nbsp;»
      (2026). Pour suivre l'évolution des métiers et de l'emploi, consulte
      <dsfr-link
        label="l'Observatoire des métiers de la cybersécurité"
        href="https://cyber.gouv.fr/offre-de-service/formations-entrainement-et-decouverte-des-metiers/observatoires-des-metiers/"
        size="sm"
        neutral
      ></dsfr-link>.
    </p>
  </div>
</dsfr-container>

<style lang="scss">
  .j-explore {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-chapeau {
      margin-block-end: 0;
    }

    &-familles {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    &-chargement,
    &-erreur {
      display: flex;
      justify-content: center;
      padding: 2rem;
      color: var(--text-mention-grey);
    }

    &-image {
      background-color: var(--image-couleur-fond);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-block: 2.75rem;

      &.yellow-moutarde {
        --image-couleur-fond: var(--background-contrast-yellow-moutarde);
        --numero-couleur-bordure: var(--artwork-motif-yellow-moutarde);
        --numero-couleur-texte: var(--text-label-yellow-moutarde);
      }
      &.green-emeraude {
        --image-couleur-fond: var(--background-contrast-green-emeraude);
        --numero-couleur-bordure: var(--artwork-motif-green-emeraude);
        --numero-couleur-texte: var(--text-label-green-emeraude);
      }
      &.blue-cumulus {
        --image-couleur-fond: var(--background-contrast-blue-cumulus);
        --numero-couleur-bordure: var(--artwork-motif-blue-cumulus);
        --numero-couleur-texte: var(--text-label-blue-cumulus);
      }
      &.purple-glycine {
        --image-couleur-fond: var(--background-contrast-purple-glycine);
        --numero-couleur-bordure: var(--artwork-motif-purple-glycine);
        --numero-couleur-texte: var(--text-label-purple-glycine);
      }
      &.green-archipel {
        --image-couleur-fond: var(--background-contrast-green-archipel);
        --numero-couleur-bordure: var(--artwork-motif-green-archipel);
        --numero-couleur-texte: var(--text-label-green-archipel);
      }
    }

    &-numero {
      --numero-dimension: 47.75%;

      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      border: 0.75rem solid var(--numero-couleur-bordure);
      color: var(--numero-couleur-texte);
      font-size: 4.188rem;
      font-weight: bold;
      width: var(--numero-dimension);
    }

    &-sources {
      color: var(--text-mention-grey);
    }
  }
</style>
