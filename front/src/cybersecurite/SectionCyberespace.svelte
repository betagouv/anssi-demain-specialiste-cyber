<script lang="ts">
  type Couche = {
    titre: string;
    description: string;
    image: string;
  };

  const couches: Couche[] = [
    {
      titre: 'La couche sémantique',
      description: 'Les informations : photos, vidéos, mails, messages…',
      image: '/assets/images/cybersecurite/illustration-couche-semantique.avif',
    },
    {
      titre: 'La couche logicielle',
      description: `Les systèmes d'exploitation, logiciels et applications mobiles.`,
      image: '/assets/images/cybersecurite/illustration-couche-logicielle.avif',
    },
    {
      titre: 'La couche matérielle',
      description: 'Les câbles sous-marins, les serveurs, les ordinateurs, les téléphones, les objets connectés.',
      image: '/assets/images/cybersecurite/illustration-couche-materielle.avif',
    },
  ];
</script>

<section id="cyberespace">
  <dsfr-container>
    <div class="conteneur">
      <h2 class="titre fr-h1">Le cyberespace</h2>
      <p class="chapeau texte-article-lg">
        Ton téléphone, ta console, le réseau informatique du collège ou du lycée, internet et toutes les informations
        échangées à travers le monde : tout ça forme le « cyberespace » structuré en trois couches&nbsp;:
      </p>
      <div class="contenu">
        {#each couches as couche}
          <dsfr-card
            title={couche.titre}
            has-description
            description={couche.description}
            no-link
            size="md"
            horizontal
            horizontal-proportion="tier"
            src={couche.image}
          ></dsfr-card>
        {/each}
      </div>
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  .conteneur {
    display: flex;
    padding-block: 3rem;
    flex-direction: column;
    gap: 3rem;

    @include a-partir-de(lg) {
      max-width: taille-pour-colonnes(8);
      margin-inline: auto;
    }
  }

  .titre {
    text-align: center;
  }

  .titre,
  .chapeau {
    margin-block-end: 0;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
