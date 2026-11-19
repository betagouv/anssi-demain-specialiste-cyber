<script lang="ts">
  type Carte = {
    titre: string;
    description: string;
    image: string;
  };

  type Exemple = {
    mois: string;
    description: string;
  };

  const vecteurs: Carte[] = [
    {
      titre: 'Humain',
      description: `Le premier vecteur d'attaque\u00A0: c'est toi qui es visé, pas ton ordinateur\u00A0! L'attaquant joue sur ta confiance ou ta curiosité. Exemples\u00A0: un faux message qui prétend venir de ton collège, d'un jeu ou d'un livreur pour te faire cliquer sur un lien (c'est l'hameçonnage, ou phishing), ou une clé USB trouvée par terre que tu branches «\u00A0pour voir\u00A0».`,
      image: '/assets/images/cybersecurite/illustration-personnage-au-centre-outils-numeriques.avif',
    },
    {
      titre: 'Informatique',
      description: `L'attaquant passe par un programme ou une faille pour s'en prendre à un système ou à un réseau. Exemples\u00A0: un virus caché dans un jeu piraté ou une fausse application, ou un logiciel pas mis à jour dont une faille laisse la porte ouverte.`,
      image: '/assets/images/cybersecurite/illustration-ordinateur-portable-infecte-virus.avif',
    },
    {
      titre: 'Physique',
      description: `L'attaquant agit sur place, dans le monde réel. Exemples\u00A0: entrer dans une salle serveur, brancher un appareil sur un ordinateur resté déverrouillé, sectionner des câbles, voler un serveur ou un téléphone.`,
      image: '/assets/images/cybersecurite/illustration-ordinateur-portable-devant-datacenter.avif',
    },
  ];

  const attaques: Carte[] = [
    {
      titre: `L'hameçonnage (phishing)`,
      description: `Un faux message (SMS, mail, message privé, appel) se fait passer pour quelqu'un de confiance pour te faire cliquer, payer ou donner tes identifiants.`,
      image: '/assets/images/cybersecurite/illustration-phishing.avif',
    },
    {
      titre: 'Les rançongiciels',
      description: `Un programme malveillant bloque l'accès aux données (photos, fichiers clients…) pour obtenir de l'argent en échange.`,
      image: '/assets/images/cybersecurite/illustration-alerte-ordinateur-portable-verouille.avif',
    },
    {
      titre: 'Les attaques par déni de service distribué (DDoS)',
      description: `Un réseau de machines «\u00A0zombies\u00A0» (un botnet) envoie trop de requêtes à un service pour le rendre inaccessible.`,
      image: '/assets/images/cybersecurite/illustration-ordinateur-portable-au-centre-de-trois-autres.avif',
    },
  ];

  const exemples: Exemple[] = [
    {
      mois: 'Mars',
      description: `Des membres de l'ONG Reporters sans frontières auraient été visés par des courriels d'hameçonnage attribués à un mode opératoire lié à la Russie.`,
    },
    {
      mois: 'Février',
      description: `Un établissement d'enseignement supérieur a dû passer ses cours à distance après un rançongiciel qui a rendu tout son système d'information indisponible.`,
    },
    {
      mois: 'Novembre',
      description: `Lors des élections municipales au Danemark, les sites de partis politiques et celui du Parlement danois ont été visés par des attaques DDoS revendiquées par le groupe hacktiviste pro-russe NoName057.`,
    },
  ];
</script>

<section id="cyberattaques">
  <dsfr-container>
    <section class="conteneur">
      <header class="entete-section">
        <h2 class="entete-titre fr-h1">Les cyberattaques</h2>
        <p class="entete-chapeau texte-standard-md">
          Une cyberattaque exploite des vulnérabilités (des failles techniques ou organisationnelles) en passant par un
          vecteur d'attaque.
        </p>
      </header>

      <div class="vecteurs">
        <h3 class="sous-titre fr-h5">
          Les vecteurs d'attaques&nbsp;: par quels chemins les attaquants parviennent-ils à leurs fins&nbsp;?
        </h3>

        <div class="contenu-cartes">
          {#each vecteurs as vecteur}
            <dsfr-card
              title={vecteur.titre}
              markup="h4"
              has-description
              description={vecteur.description}
              no-link
              size="sm"
              src={vecteur.image}
              alt=""
            ></dsfr-card>
          {/each}
        </div>
      </div>

      <div class="connaitre">
        <h3 class="sous-titre fr-h5">Trois attaques à connaître</h3>

        <div class="contenu-cartes">
          {#each attaques as attaque}
            <dsfr-card
              title={attaque.titre}
              markup="h4"
              has-description
              description={attaque.description}
              no-link
              size="sm"
              src={attaque.image}
              alt=""
            ></dsfr-card>
          {/each}
        </div>

        <div class="exemples">
          <h4 class="titre-exemples fr-h6">Exemples d'attaques en 2025</h4>

          <div class="contenu-exemples">
            {#each exemples as exemple}
              <div class="exemple">
                <dsfr-badge label={exemple.mois} type="accent" accent="blue-cumulus" size="md"></dsfr-badge>
                <p class="exemple-detail texte-detail-sm">{exemple.description}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  section {
    background-color: var(--background-alt-pink-tuile);
  }

  .conteneur {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-block: 3rem;

    @include a-partir-de(lg) {
      max-width: taille-pour-colonnes(10);
      margin-inline: auto;
    }
  }

  .sous-titre {
    text-align: center;
  }

  .contenu-cartes,
  .contenu-exemples {
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .exemples {
    margin-block-start: 1.5rem;
  }

  .exemple-detail {
    margin-block: 0.75rem 0;
  }
</style>
