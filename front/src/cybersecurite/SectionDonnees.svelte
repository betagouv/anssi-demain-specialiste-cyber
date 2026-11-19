<script lang="ts">
  type Garantie = {
    icone: string;
    titre: string;
    description: string;
    exempleAttaque: string;
  };

  const garanties: Garantie[] = [
    {
      icone: '/pictogrammes/pictogramme-televerser-fichier.svg',
      titre: 'La disponibilité',
      description: `Pouvoir accéder à ses données ou à un service au moment voulu.`,
      exempleAttaque: `Un logiciel malveillant chiffre tout ton ordinateur, plus rien n'est accessible.`,
    },
    {
      icone: '/pictogrammes/pictogramme-document-signe.svg',
      titre: `L'intégrité`,
      description: `S'assurer que les données sont exactes, complètes et n'ont pas été modifiées.`,
      exempleAttaque: `Quelqu'un change des notes sur l'espace numérique de travail sans en avoir le droit.`,
    },
    {
      icone: '/pictogrammes/pictogramme-carte-de-presse.svg',
      titre: 'La confidentialité',
      description: 'Garantir que seules les personnes autorisées accèdent aux données.',
      exempleAttaque: `Quelqu'un réussit à ouvrir ton téléphone et lit tes messages.`,
    },
  ];
</script>

<section id="donnees">
  <dsfr-container>
    <header class="entete-section">
      <h2 class="entete-titre fr-h1">Les données</h2>
      <p class="entete-chapeau texte-article-lg">
        La cybersécurité, c'est l'ensemble des actions et des solutions permettant de protéger les données et les
        systèmes d'information contre les menaces venues du cyberespace.
      </p>
    </header>

    <div class="contenu">
      <h3 class="sous-titre fr-h6">La cybersécurité veille à garantir</h3>
      <div class="garanties">
        {#each garanties as garantie}
          <div class="garantie">
            <dsfr-tile
              title={garantie.titre}
              markup-level="4"
              has-description
              description={garantie.description}
              no-link
              action-markup="false"
              size="md"
            >
              <img src={garantie.icone} alt="" slot="pictogram" />
            </dsfr-tile>

            <div class="exemple">
              <dsfr-badge label="Attaque" type="accent" accent="pink-tuile" size="md"></dsfr-badge>
              <p class="exemple-detail texte-detail-sm">{garantie.exempleAttaque}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  section {
    background-color: var(--background-alt-beige-gris-galet);
    padding-block: 4.5rem;
  }

  .contenu {
    margin-top: 2rem;
  }

  .sous-titre {
    text-align: center;
  }

  .garanties {
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  dsfr-tile {
    margin-block-end: 1.5rem;
  }

  .exemple-detail {
    margin-block: 0.75rem 0;
  }
</style>
