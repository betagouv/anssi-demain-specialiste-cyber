<script lang="ts">
  type Attaquant = {
    titre: string;
    description: string;
    image: string;
  };

  type Motivation = {
    title: string;
    pictogram?: string;
  };

  const attaquants: Attaquant[] = [
    {
      titre: 'Les amateurs',
      description:
        'Peu de compétences, des outils tout faits trouvés en ligne : on les appelle les « script kiddies ».',
      image: '/assets/images/cybersecurite/illustration-console-avec-point-interrogation.avif',
    },
    {
      titre: 'Les « vengeurs »',
      description: 'Souvent isolés, ils agissent pour une raison personnelle, parfois affective : rancune, conflit.',
      image: '/assets/images/cybersecurite/illustration-cible-avec-icone-eclair.avif',
    },
    {
      titre: 'Les cyberhacktivistes',
      description: 'Ils attaquent pour défendre une cause idéologique ou politique, souvent en bloquant des sites.',
      image: '/assets/images/cybersecurite/illustration-megaphone.avif',
    },
    {
      titre: 'Les attaquants expérimentés',
      description: `Très compétents, ils sont d'abord motivés par le défi technique et la recherche de failles.`,
      image: '/assets/images/cybersecurite/illustration-ordinateur-portable-avec-icone-ia.avif',
    },
    {
      titre: 'Les cybercriminels organisés',
      description: `Des groupes structurés, parfois mercenaires, qui attaquent avant tout pour gagner de l'argent.`,
      image: '/assets/images/cybersecurite/illustration-trois-cercles-bleus-avec-silhouette-et-icone-euros.avif',
    },
    {
      titre: 'Les États',
      description: `Avec des moyens importants, ils attaquent pour espionner, saboter ou se préparer à agir plus tard.`,
      image: '/assets/images/cybersecurite/illustration-institution-publique-avec-icone-oeil.avif',
    },
  ];

  const motivations: Motivation[] = [
    { title: 'Par défi, amusement', pictogram: '/pictogrammes/pictogramme-manette-jeux-videos.svg' },
    { title: `Pour l'argent`, pictogram: '/pictogrammes/pictogramme-piles-de-pieces.svg' },
    { title: 'Pour influencer', pictogram: '/pictogrammes/pictogramme-institution-publique.svg' },
    { title: 'Pour espionner', pictogram: '/pictogrammes/pictogramme-institution-publique.svg' },
    { title: 'Pour se prépositionner pour agir plus tard', pictogram: '/pictogrammes/pictogramme-calendrier.svg' },
    { title: 'Pour saboter', pictogram: '/pictogrammes/pictogramme-symbole-attention.svg' },
  ];
</script>

<section id="attaquants">
  <dsfr-container>
    <div class="conteneur">
      <header class="entete-section">
        <h2 class="entete-titre fr-h1">Les attaquants et leurs motivations</h2>
        <p class="entete-chapeau texte-standard-md">
          <strong>Attention aux clichés&nbsp;!</strong> Dans les films, un attaquant informatique est souvent jeune isolé,
          portant une capuche pour pirater un service gouvernemental depuis sa chambre. La réalité est bien plus complexe.
        </p>
      </header>

      <div class="types">
        <h3 class="sous-titre fr-h5">Les six types d'attaquants</h3>

        <div class="contenu-types">
          {#each attaquants as attaquant}
            <dsfr-card
              title={attaquant.titre}
              markup="h4"
              has-description
              description={attaquant.description}
              no-link
              size="sm"
              horizontal
              horizontal-proportion="tier"
              src={attaquant.image}
              alt=""
            ></dsfr-card>
          {/each}
        </div>
      </div>

      <div class="motivations">
        <h3 class="sous-titre fr-h5">Les motivations</h3>

        <div class="contenu-motivations">
          {#each motivations as motivation}
            <dsfr-tile
              title={motivation.title}
              markup-level="4"
              size="sm"
              pictogram-name={motivation.pictogram}
              action-markup="false"
              no-link
              no-icon
              horizontal
            >
              <img src={motivation.pictogram} alt="" slot="pictogram" />
            </dsfr-tile>
          {/each}
        </div>
      </div>

      <dsfr-highlight>
        <p slot="title" class="fr-h6">
          <strong>Les hackers ne sont pas forcément des pirates&nbsp;!</strong>
        </p>
        <p slot="text">
          À l'origine, le mot «&nbsp;hacker&nbsp;» renvoie à une culture positive de la débrouille, du partage et de la
          transformation. Pour se distinguer des hackers malveillants, on parle de hackers éthiques&nbsp;: ils testent
          la sécurité, avec autorisation.
        </p>
      </dsfr-highlight>
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  .conteneur {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-block: 4.5rem;
  }

  .sous-titre {
    text-align: center;
  }

  .motivations {
    @include a-partir-de(lg) {
      max-width: taille-pour-colonnes(10);
      margin-inline: auto;
    }
  }

  .contenu-types,
  .contenu-motivations {
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include a-partir-de(xl) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
