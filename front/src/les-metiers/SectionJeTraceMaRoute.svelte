<script lang="ts">
  type Diplome = {
    badge: string;
    titre: string;
    description: string;
  };

  type ExempleParcours = {
    nom: string;
    image: string;
    etapes: string[];
    metier: string;
  };

  type Formation = {
    titre: string;
    description: string;
    href: string;
    detail?: string;
    externe?: boolean;
  };

  const diplomes: Diplome[] = [
    {
      badge: 'Au lycée',
      titre: 'Poser les bases',
      description:
        'Bac pro CIEL, bac techno STI2D, spécialité NSI en voie générale.',
    },
    {
      badge: 'Bac + 1 à bac + 3',
      titre: 'Entrer vite dans le métier',
      description:
        'CS cybersécurité, BTS CIEL ou SIO, BUT informatique ou réseaux et télécommunications, licence professionnelle.',
    },
    {
      badge: 'Bac + 5',
      titre: 'Se spécialiser',
      description:
        "Master (cybersécurité, informatique, mathématiques, droit du numérique…), diplôme d'ingénieur ou d'école spécialisée.",
    },
    {
      badge: 'Bac + 6 et plus',
      titre: 'Devenir expert(e)',
      description:
        'Mastère spécialisé, doctorat pour la recherche. Et tout au long de la vie : formation continue, MOOC, certifications.',
    },
  ];

  const parcoursPros: ExempleParcours[] = [
    {
      nom: 'Tristan, 33 ans',
      image: '/assets/images/les-metiers/parcours-tristan.png',
      etapes: ['Bac Pro', 'BTS'],
      metier: 'Analyste réponse aux incidents',
    },
    {
      nom: 'Lucie, 28 ans',
      image: '/assets/images/les-metiers/parcours-lucie.png',
      etapes: ['Bac STI2D', 'BTS'],
      metier: 'Administratrice système',
    },
    {
      nom: 'Mickaël, 46 ans',
      image: '/assets/images/les-metiers/parcours-mickael.png',
      etapes: ['Bac STI2D', 'DUT', 'Licence puis master'],
      metier: 'Responsable cybersécurité produits',
    },
    {
      nom: 'Marine, 32 ans',
      image: '/assets/images/les-metiers/parcours-marine.png',
      etapes: ['Bac général', 'Prépa scientifique', "Diplôme d'ingénieur"],
      metier: 'Responsable réponse aux incidents',
    },
    {
      nom: 'Thierry, 59 ans',
      image: '/assets/images/les-metiers/parcours-thierry.png',
      etapes: ['Bac général', 'Licence puis master de maths', 'Doctorat'],
      metier: 'Enseignant-chercheur',
    },
  ];

  const formations: Formation[] = [
    {
      titre: 'Les formations près de chez toi',
      description:
        "Des défis ludiques et des activités d'introduction te permettent de te familiariser avec les enjeux de la cybersécurité.",
      href: '/selection-eleves#trouver',
    },
    {
      titre: 'Se former à la cybersécurité',
      description:
        'Du BTS au doctorat, en passant par les labels et les certifications : le panorama complet des formations.',
      href: 'https://www.onisep.fr/les-metiers-de-la-cybersecurite',
      detail: 'www.onisep.fr',
      externe: true,
    },
    {
      titre: 'Les formations labellisées',
      description:
        'SecNumedu repère les formations supérieures spécialisées en cybersécurité ; CyberEdu, celles qui intègrent un socle cyber.',
      href: 'https://cyber.gouv.fr/secnumedu',
      detail: 'cyber.gouv.fr',
      externe: true,
    },
    {
      titre: 'Campus Cyber Évolution',
      description:
        "Une carte des formations, des offres d'emploi et des ressources pour trouver sa voie dans la cybersécurité.",
      href: 'https://campuscyber.fr',
      detail: 'Campus Cyber',
      externe: true,
    },
  ];
</script>

<dsfr-container id="je-trace-ma-route">
  <div class="je-trace-ma-route">
    <div class="je-trace-ma-route-entete">
      <h3 class="fr-h1">Plusieurs chemins mènent à la cyber</h3>
      <p class="je-trace-ma-route-chapeau texte-article-lg">
        Voie professionnelle, technologique ou générale, études courtes ou
        longues, formation initiale ou alternance&nbsp;: il n'y a pas un
        parcours type. Une offre d'emploi sur trois ne précise même pas le
        niveau d'études requis.
      </p>
    </div>

    <div class="diplomes">
      <h4 class="diplomes-titre fr-h2">Les diplômes, niveau par niveau</h4>

      <p class="diplomes-alternance">
        La plupart de ces diplômes peuvent se préparer en alternance.
      </p>

      <div class="diplomes-grille">
        {#each diplomes as diplome}
          <dsfr-tile
            title={diplome.titre}
            has-description
            description={diplome.description}
            has-tag
            action-markup="false"
            no-link
            size="md"
          >
            <dsfr-badge
              slot="tag"
              label={diplome.badge}
              type="accent"
              accent="purple-glycine"
              size="md"
            ></dsfr-badge>
          </dsfr-tile>
        {/each}
      </div>

      <p class="diplomes-source fr-text--xs">
        Source&nbsp;: Onisep, Zoom «&nbsp;Les métiers de la cybersécurité&nbsp;»
        (2026).
      </p>
    </div>

    <div class="parcours">
      <h4 class="parcours-titre fr-h2">
        Cinq exemples de parcours, cinq façons d'y arriver
      </h4>

      <div class="parcours-conteneur">
        {#each parcoursPros as parcours, i}
          <div class="parcours-ligne">
            <div class="parcours-identite">
              <img class="parcours-avatar" src={parcours.image} alt="" />
              <span class="parcours-nom">{parcours.nom}</span>
            </div>
            <div class="parcours-etapes">
              {#each parcours.etapes as etape}
                <span class="parcours-etape">{etape}</span>
                <span
                  class="fr-icon-arrow-right-s-line parcours-fleche"
                  aria-hidden="true"
                ></span>
              {/each}
              <span class="parcours-metier">{parcours.metier}</span>
            </div>
          </div>
          {#if i < parcoursPros.length - 1}
            <hr />
          {/if}
        {/each}
      </div>

      <p class="parcours-footer">
        Retrouve leur parcours dans le Zoom «&nbsp;Les métiers de la
        cybersécurité&nbsp;» de l'Onisep.
        <dsfr-link
          label="Consulter le Zoom"
          href="https://www.onisep.fr/les-metiers-de-la-cybersecurite"
          size="md"
          blank
          neutral
        ></dsfr-link>
      </p>
    </div>

    <div class="formations">
      <h4 class="formations-titre fr-h2">Commence à te former en cyber</h4>

      <div class="formations-grille">
        {#each formations as formation}
          {#if formation.externe}
            <dsfr-card
              title={formation.titre}
              has-description
              description={formation.description}
              href={formation.href}
              enlarge
              size="md"
              has-detail-end
              detail-end={formation.detail}
              blank
            ></dsfr-card>
          {:else}
            <dsfr-card
              title={formation.titre}
              has-description
              description={formation.description}
              href={formation.href}
              enlarge
              size="md"
            ></dsfr-card>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</dsfr-container>

<style lang="scss">
  @use '../../src/style/points-de-rupture' as *;

  .je-trace-ma-route {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    &-chapeau {
      margin-block-end: 0;
    }
  }

  .diplomes {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &-titre {
      margin-block-end: 0;
    }

    &-grille {
      display: grid;
      gap: 1.5rem;

      @include a-partir-de(md) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include a-partir-de(lg) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    &-alternance,
    &-source {
      margin-block-end: 0;
    }

    &-source {
      color: var(--text-mention-grey);
    }
  }

  .parcours {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-titre {
      margin-block-end: 0;
    }

    &-conteneur {
      background-color: var(--background-contrast-beige-gris-galet);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &-ligne {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @include a-partir-de(lg) {
        display: grid;
        grid-template-columns: 1fr 4fr;
        gap: 1.5rem;
        align-items: center;
      }
    }

    &-identite {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    &-avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    &-nom {
      font-weight: 700;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    &-etapes {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    &-fleche {
      color: var(--text-default-grey);

      &::before {
        --icon-size: 1.5rem;
      }
    }

    &-metier {
      background-color: var(--background-contrast-blue-france);
      color: var(--text-action-high-blue-france);
      font-weight: 500;
      padding: 0.375rem 0.75rem;
    }

    &-footer {
      margin-block-end: 0;
    }
  }

  .formations {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-titre {
      margin-block-end: 0;
    }

    &-grille {
      display: grid;
      gap: 1.5rem;

      @include a-partir-de(md) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include a-partir-de(lg) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
</style>
