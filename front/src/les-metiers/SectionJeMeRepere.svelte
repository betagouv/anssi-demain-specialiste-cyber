<script lang="ts">
  type ProfilMetier = {
    titre: string;
    description: string;
    detail: string;
    badge: string;
    badgeAccent: string;
    image: string;
  };

  const profils: ProfilMetier[] = [
    {
      titre: 'Responsable cybersécurité',
      description: "Pilote la sécurité informatique d'une organisation.",
      detail: 'Leila, 31 ans',
      badge: 'Pilotage',
      badgeAccent: 'yellow-moutarde',
      image: '/assets/images/les-metiers/profil-responsable-cybersecurite.png',
    },
    {
      titre: 'Cryptologue',
      description:
        "Conçois des algorithmes de sécurité permettant de chiffrer les échanges d'informations sensibles.",
      detail: 'Kylian, 38 ans',
      badge: 'Conception',
      badgeAccent: 'green-bourgeon',
      image: '/assets/images/les-metiers/profil-cryptologue.png',
    },
    {
      titre: 'Analyste des cybermenaces',
      description:
        "Apprends à connaître et à reconnaître les cyberattaques pour mieux s'en protéger.",
      detail: 'Elliot, 26 ans',
      badge: 'Incidents et crises',
      badgeAccent: 'blue-cumulus',
      image: '/assets/images/les-metiers/profil-analyste-cybermenaces.png',
    },
    {
      titre: 'Expert(e) cyberdéfense',
      description:
        'Porte secours aux personnes et aux organisations victimes de cyberattaques.',
      detail: 'Léonie, 32 ans',
      badge: 'Incidents et crises',
      badgeAccent: 'blue-cumulus',
      image: '/assets/images/les-metiers/profil-experte-cyberdefense.png',
    },
    {
      titre: 'Hacker éthique / Pentester',
      description:
        'Recherche les failles de sécurité avant que des attaquants ne puissent les exploiter.',
      detail: 'Léo, 22 ans',
      badge: 'Conseil et recherche',
      badgeAccent: 'purple-glycine',
      image: '/assets/images/les-metiers/profil-hacker-ethique.png',
    },
    {
      titre: 'Juriste cyber',
      description:
        'Protège et défend juridiquement les organisations face aux menaces informatiques.',
      detail: 'Alix, 26 ans',
      badge: 'Métiers connexes',
      badgeAccent: 'green-archipel',
      image: '/assets/images/les-metiers/profil-juriste-cyber.png',
    },
  ];
</script>

<dsfr-container id="je-me-repere">
  <div class="je-me-repere">
    <div class="je-me-repere-entete">
      <h3 class="fr-h2">Explore 6 profils de métiers cyber</h3>
      <p class="je-me-repere-chapeau texte-article-lg">
        Explore chaque profil pour découvrir les métiers associés, les missions,
        les formations et les témoignages de professionnels.
      </p>
    </div>

    <div class="je-me-repere-grille">
      {#each profils as profil}
        <dsfr-card
          title={profil.titre}
          has-description
          description={profil.description}
          has-badge
          has-detail-start
          detail-start={profil.detail}
          size="md"
          src={profil.image}
          no-link
        >
          <dsfr-badges-group
            slot="badgesgroup"
            badges={[{ label: profil.badge, accent: profil.badgeAccent }]}
            size="sm"
          ></dsfr-badges-group>
        </dsfr-card>
      {/each}
    </div>

    <p class="je-me-repere-conclusion texte-article-lg">
      <strong>Tu ne te reconnais dans aucun profil&nbsp;?</strong>
      La cyber compte plus de 25 métiers. Architecte, formatrice, développeur de solutions
      de sécurité, chargée de communication… Explore les cinq familles pour trouver
      ta place.
      <dsfr-link
        label="Explorer les familles de métiers"
        href="#j-explore"
        size="lg"
      ></dsfr-link>
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
