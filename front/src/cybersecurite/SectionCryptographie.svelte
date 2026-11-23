<script lang="ts">
  const evenements = [
    {
      date: 'Vers 50 av. J.-C.',
      titre: 'Le chiffre de César',
      description: `Jules César protège ses correspondances en décalant l'alphabet de trois places.`,
    },
    {
      date: 'XVIIe siècle',
      titre: 'Le «\u00A0cryptographe du Roy\u00A0»',
      description: `Antoine Rossignol chiffre et déchiffre les messages de Louis XIII puis de Louis XIV.`,
    },
    {
      date: '1918',
      titre: 'Le Radiogramme de la Victoire',
      description: `L'officier Georges Painvain perce les codes allemands, ce qui aide la France à contre-attaquer.`,
    },
    {
      date: 'Seconde Guerre mondiale',
      titre: 'Enigma',
      description: `La machine de chiffrement allemande est percée par les Alliés, un tournant décisif dans le conflit.`,
    },
    {
      date: 'Années 1950 à 1970',
      titre: 'Électronique, informatique, réseaux',
      description: `La cryptographie accompagne l'essor de l'informatique et des télécommunications pour protéger les échanges.`,
    },
    {
      date: 'Depuis les années 1990',
      titre: 'Internet pour tous',
      description: `La cryptographie protège nos communications au quotidien\u00A0: achats en ligne, messageries, signatures électroniques.`,
    },
  ];
</script>

<section id="cryptographie">
  <dsfr-container>
    <div class="entete-section">
      <h2 class="entete-titre fr-h1">Découvre la cryptographie</h2>
      <p class="entete-chapeau texte-standard-md">
        La cryptographie est l'ensemble des procédés permettant de transformer une donnée lisible par tous (dite
        «&nbsp;en clair&nbsp;») comme une photo, en une donnée «&nbsp;chiffrée&nbsp;» compréhensible seulement de celles
        et ceux disposant d'une «&nbsp;clé&nbsp;» pour la déchiffrer.
      </p>
    </div>

    <div class="contenu">
      <ol class="frise-chronologique">
        {#each evenements as evenement}
          <li class="etape">
            <div class="date fr-text">{evenement.date}</div>
            <div class="point"></div>
            <div class="contenu-etape">
              <dsfr-card
                title={evenement.titre}
                has-description
                description={evenement.description}
                no-link
                size="sm"
                horizontal
              ></dsfr-card>
            </div>
          </li>
        {/each}
      </ol>
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  section {
    background-color: var(--background-alt-blue-france);
    padding-block: 4.5rem;
  }

  .contenu {
    @media (max-width: 767px) {
      overflow-x: auto;
    }
  }

  .frise-chronologique {
    list-style-type: none;
    position: relative;
    margin-block: 2rem 0;
    padding-inline-start: 0;

    @media (max-width: 767px) {
      display: flex;
      gap: 1rem;
    }
  }

  .etape {
    width: calc(100% - 2rem);

    @media (max-width: 767px) {
      flex-shrink: 0;

      &:first-child {
        --filet-position-gauche: 50%;
      }

      &:last-child {
        --filet-position-droite: 50%;
      }
    }

    @include a-partir-de(sm) {
      width: calc(50% - 2rem);
    }

    @include a-partir-de(md) {
      gap: 1.5rem;
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      width: auto;

      &:first-child {
        --filet-position-haut: 50%;
      }

      &:last-child {
        --filet-position-bas: 50%;
      }

      &:not(:last-child) {
        margin-block-end: 1rem;
      }
    }
  }

  .date {
    color: var(--text-label-grey);
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: right;
    margin-block-end: 1.5rem;

    @include a-partir-de(md) {
      justify-content: flex-end;
      grid-column: 2 / span 2;
      margin-block-end: 0;
    }
  }

  .point {
    position: relative;
    min-width: 2rem;
    min-height: 2rem;
    margin-block-end: 1.5rem;

    @include a-partir-de(md) {
      margin-block-end: 0;
      grid-column: 4 / span 1;
    }

    &::before {
      content: '';
      background: var(--border-action-low-blue-france);
      position: absolute;

      @media (max-width: 767px) {
        height: 0.25rem;
        left: var(--filet-position-gauche, -10%);
        right: var(--filet-position-droite, -10%);
        top: 50%;
        transform: translateY(-50%);
      }

      @include a-partir-de(md) {
        bottom: var(--filet-position-bas, -10%);
        left: 50%;
        top: var(--filet-position-haut, -10%);
        transform: translateX(-50%);
        width: 0.25rem;
      }
    }

    &::after {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--background-default-grey);
      border-radius: 50%;
      border: 0.25rem solid var(--border-default-blue-france);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
    }
  }

  .contenu-etape {
    @include a-partir-de(md) {
      grid-column: 5 / span 7;
    }
  }
</style>
