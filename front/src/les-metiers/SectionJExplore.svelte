<script lang="ts">
  type FamilleMetier = {
    titre: string;
    description: string;
    badge: string;
    badgeAccent: string;
  };

  const familles: FamilleMetier[] = [
    {
      titre: 'Gestion de la sécurité et pilotage des projets de sécurité',
      description:
        'Celles et ceux qui fixent le cap : définir la stratégie de cybersécurité, piloter les projets et sensibiliser les équipes, en lien avec la direction.',
      badge: 'Pilotage',
      badgeAccent: 'yellow-moutarde',
    },
    {
      titre: "Conception et maintien d'un système d'information sécurisé",
      description:
        'Celles et ceux qui construisent solide : intégrer la sécurité dès la conception des systèmes, chiffrer les données, administrer les outils de protection au quotidien.',
      badge: 'Conception',
      badgeAccent: 'green-emeraude',
    },
    {
      titre: 'Gestion des incidents et des crises de sécurité',
      description:
        "Celles et ceux qui montent au front : surveiller, détecter les attaques, enquêter sur ce qui s'est passé, réagir vite et piloter la crise quand elle survient.",
      badge: 'Incidents et crises',
      badgeAccent: 'blue-cumulus',
    },
    {
      titre: 'Conseil, services et recherche',
      description:
        'Celles et ceux qui éclairent et inventent : conseiller les organisations, tester leurs défenses, former, développer les solutions de sécurité de demain, faire avancer la recherche.',
      badge: 'Conseil et recherche',
      badgeAccent: 'purple-glycine',
    },
    {
      titre: 'Métiers connexes',
      description:
        'Celles et ceux qui apportent une autre expertise à la cyber : droit, protection des données, gestion des risques, communication, commerce, administration des systèmes.',
      badge: 'Métiers connexes',
      badgeAccent: 'green-archipel',
    },
  ];
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

    <div class="j-explore-familles">
      {#each familles as famille, index}
        <dsfr-card
          title={famille.titre}
          has-description
          description={famille.description}
          has-badge
          has-links
          no-icon
          size="lg"
          horizontal
          horizontal-proportion="tier"
          no-link
        >
          <div
            class={['j-explore-image', `${famille.badgeAccent}`]}
            slot="image"
          >
            <span class="j-explore-numero">{index + 1}</span>
          </div>
          <dsfr-badges-group
            slot="badgesgroup"
            badges={[{ label: famille.badge, accent: famille.badgeAccent }]}
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
