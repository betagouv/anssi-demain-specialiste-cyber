<script lang="ts">
  type Pilier = {
    titre: string;
    description: string;
    image: string;
  };

  const piliers: Pilier[] = [
    {
      titre: 'Prévenir à savoir empêcher que les cyberattaques surviennent',
      description: `L'analyse des risques cyber, la mise en œuvre de mesures de sécurité comme le chiffrement des données, la sensibilisation des personnes permettent de réduire le risque de survenue d'une cyberattaque.`,
      image: '/assets/images/cybersecurite/illustration-ordinateur-portable-protege.avif',
    },
    {
      titre: 'Détecter les attaques afin de pouvoir y répondre',
      description: `Des dispositifs permettent de repérer des «\u00A0signatures d'attaques\u00A0» ou des comportements anormaux. Attention aux faux positifs (fausse alerte\u00A0!) et aux faux négatifs (une vraie attaque qui ne serait pas vue ou serait considérée comme une action légitime).`,
      image: '/assets/images/cybersecurite/illustration-checklist-avec-loupe.avif',
    },
    {
      titre: 'Réagir une fois une attaque identifiée',
      description: `Comprendre l'attaque, contenir, désinfecter, restaurer. Les équipes CSIRT - ou équipes de réponse aux incidents informatiques - sont les «\u00A0médecins\u00A0» et les «\u00A0pompiers\u00A0» de la cyber.`,
      image: '/assets/images/cybersecurite/illustration-ecran-parametres-securite.avif',
    },
  ];
</script>

<section id="cybersecurite">
  <dsfr-container>
    <header class="entete-section">
      <h2 class="entete-titre fr-h1">La cybersécurité</h2>
      <p class="entete-chapeau texte-standard-md">
        Protéger les systèmes d'information, les données et les personnes est un défi passionnant et complexe&nbsp;!
        L'avantage va souvent aux attaquants&nbsp;: ils peuvent rester discrets, attaquer depuis l'autre bout du monde
        et choisir leur moment. Pour réduire les risques de cyberattaques et se préparer à y répondre, la cybersécurité
        repose sur plusieurs grands piliers.
      </p>
    </header>

    <div class="contenu">
      {#each piliers as pilier}
        <dsfr-card
          title={pilier.titre}
          has-description
          description={pilier.description}
          no-link
          size="md"
          src={pilier.image}
          alt=""
        ></dsfr-card>
      {/each}
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  dsfr-container {
    padding-block: 4.5rem;
  }

  .entete-section {
    margin-block-end: 3rem;
  }

  .contenu {
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
