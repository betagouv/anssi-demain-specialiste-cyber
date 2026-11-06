<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { accentPourFamille, type FamilleMetier, type Fonction } from './familleMetier.type';
  import { famillesMetierStore } from './stores/famillesMetier.store';

  type ProfilAffiche = {
    titre: string;
    description: string;
    temoignage: string;
    badge: string;
    badgeAccent: string;
    image: string;
    href?: string;
  };

  function normalise(texte: string): string[] {
    return texte
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .split(/[\s/()\-,]+/)
      .filter((mot) => mot.length > 3);
  }

  function trouveFonctionPourProfil(
    titreProfil: string,
    fonctions: Fonction[],
    indexProfil: number,
  ): Fonction | undefined {
    if (fonctions.length === 0) return undefined;

    const motsProfil = normalise(titreProfil);
    let meilleurScore = 0;
    let meilleureFonction: Fonction | undefined;

    for (const fonction of fonctions) {
      const motsFonction = normalise(fonction.nom);
      const score = motsProfil.filter((mot) => motsFonction.some((mf) => mf.includes(mot) || mot.includes(mf))).length;
      if (score > meilleurScore) {
        meilleurScore = score;
        meilleureFonction = fonction;
      }
    }

    return meilleureFonction ?? fonctions[indexProfil] ?? fonctions[0];
  }

  let chargementEnCours = $state(true);
  let erreurChargement = $state(false);
  let profils: ProfilAffiche[] = $state([]);

  function extraitProfils(familles: FamilleMetier[]): ProfilAffiche[] {
    return familles.flatMap((famille) =>
      famille.profils.map((metier, index) => {
        const fonction = trouveFonctionPourProfil(metier.titre, famille.fonctions, index);
        return {
          titre: metier.titre,
          description: fonction?.missionPrincipale ?? metier.description,
          temoignage: fonction?.témoignage?.nom ?? '',
          badge: famille.code,
          badgeAccent: accentPourFamille(famille.code),
          image: metier.liens.illustration,
          href: `/metiers/${metier.id}`,
        };
      }),
    );
  }

  onMount(async () => {
    try {
      const reponse = await axios.get<FamilleMetier[]>('/api/familles-metier');
      famillesMetierStore.initialise(reponse.data);
      profils = extraitProfils(reponse.data);
    } catch (e) {
      erreurChargement = true;
      console.error(e);
    } finally {
      chargementEnCours = false;
    }
  });
</script>

<dsfr-container id="je-me-repere">
  <div class="je-me-repere">
    <div class="je-me-repere-entete">
      <h3 class="fr-h2">
        {#if profils.length > 0}
          Explore {profils.length} profils de métiers cyber
        {:else}
          Explore les profils de métiers cyber
        {/if}
      </h3>
      <p class="je-me-repere-chapeau texte-article-lg">
        Explore chaque profil pour découvrir les métiers associés, les missions, les formations et les témoignages de
        professionnels.
      </p>
    </div>

    {#if chargementEnCours}
      <dsfr-alert title="Chargement des profils…" type="info"></dsfr-alert>
    {:else if erreurChargement}
      <dsfr-alert
        title="Erreur de chargement"
        type="error"
        has-description
        text="Impossible de charger les profils. Veuillez réessayer ultérieurement."
      ></dsfr-alert>
    {:else}
      <div class="je-me-repere-grille">
        {#each profils as profil}
          <dsfr-card
            title={profil.titre}
            has-description
            description={profil.description}
            has-header-badge
            has-detail-start
            detail-start={profil.temoignage}
            size="md"
            src={profil.image}
            href={profil.href}
            enlarge
          >
            <dsfr-badges-group
              slot="headerbadges"
              badges={[{ label: profil.badge, accent: profil.badgeAccent }]}
              size="sm"
            ></dsfr-badges-group>
          </dsfr-card>
        {/each}
      </div>
    {/if}

    <p class="je-me-repere-conclusion texte-article-lg">
      <strong>Tu ne te reconnais dans aucun profil&nbsp;?</strong>
      La cyber compte plus de 25 métiers. Architecte, formatrice, développeur de solutions de sécurité, chargée de communication…
      Explore les cinq familles pour trouver ta place.
      <dsfr-link label="Explorer les familles de métiers" href="#j-explore" size="lg"></dsfr-link>
    </p>
  </div>
</dsfr-container>

<style lang="scss">
  @use '../../src/style/points-de-rupture' as *;

  .je-me-repere {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-chapeau {
      margin-block-end: 0;
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

    &-conclusion {
      margin-block-end: 0;
    }
  }
</style>
