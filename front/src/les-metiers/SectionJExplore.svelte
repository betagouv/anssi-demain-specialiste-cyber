<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import CarteFamilleMetier from './CarteFamilleMetier.svelte';
  import type { FamilleMetier } from './familleMetier.type';
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
      const reponse = await axios.get<FamilleMetier[]>('/api/familles-metier');
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
        Les métiers de la cyber sont classés en grandes familles par l'ANSSI, l'agence nationale de la sécurité des
        systèmes d'information. L'Onisep a repris cette organisation pour ses portraits.
      </p>
    </div>

    {#if chargementEnCours}
      <dsfr-alert title="Chargement des familles de métiers…" type="info"></dsfr-alert>
    {:else if erreurChargement}
      <dsfr-alert
        title="Erreur de chargement"
        type="error"
        has-description
        text="Impossible de charger les familles de métiers. Veuillez réessayer ultérieurement."
      ></dsfr-alert>
    {:else}
      <div class="j-explore-familles">
        {#each familles as famille}
          <CarteFamilleMetier {famille} />
        {/each}
      </div>
    {/if}

    <p class="j-explore-sources fr-text--xs">
      Sources&nbsp;: ANSSI, Panorama des métiers de la cybersécurité (2020)&nbsp;; Onisep, Zoom «&nbsp;Les métiers de la
      cybersécurité&nbsp;» (2026). Pour suivre l'évolution des métiers et de l'emploi, consulte
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

    &-sources {
      color: var(--text-mention-grey);
    }
  }
</style>
