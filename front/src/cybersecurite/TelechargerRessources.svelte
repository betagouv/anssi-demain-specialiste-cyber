<script lang="ts">
  type Ressource = {
    titre: string;
    description: string;
    detail: string;
    image: string;
    lien: string;
  };

  const ressources: Ressource[] = [
    {
      titre: 'Télécharger le livret enseignant « Former à la cybersécurité »',
      description: `13 fiches pour comprendre le cyberespace, les menaces, la cryptographie, la gestion des risques, la réglementation et l'histoire. Il s'adresse d'abord aux enseignants, mais ses fiches peuvent être partagées avec les élèves.`,
      detail: 'PDF - 542 ko',
      image: '/assets/images/cej/livret-former.svg',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-1-former-a-la-cybersecurite.pdf',
    },
    {
      titre: 'Télécharger la présentation associée au livret',
      description: `Le support de présentation destiné aux élèves, à utiliser en classe avec le livret.`,
      detail: 'PPTX - 13,6 Mo',
      image: '/assets/images/cej/livret-acculturation.svg',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_presentation_eleves.pptx',
    },
  ];
</script>

<section id="ressources">
  <dsfr-container>
    <div class="contenu">
      <header class="intro">
        <h2 class="fr-h3">Télécharger les ressources</h2>
        <p class="fr-text--lg">
          Deux ressources réalisées par l'ANSSI et le ministère de l'Éducation nationale et de la jeunesse pour
          comprendre les enjeux de la cybersécurité et les aborder en classe.
        </p>
      </header>

      {#each ressources as ressource}
        <dsfr-card
          title={ressource.titre}
          has-description
          description={ressource.description}
          has-detail-end
          detail-end={ressource.detail}
          size="sm"
          src={ressource.image}
          href={ressource.lien}
          enlarge
          hasDownloadIcon
        ></dsfr-card>
      {/each}
    </div>

    <dsfr-link label="Haut de page" href="#" has-icon icon="arrow-up-line" icon-place="left" size="md"></dsfr-link>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  section {
    background-color: var(--background-alt-blue-france);
    padding-block: 4.5rem 3rem;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @include a-partir-de(md) {
      flex-direction: row;

      & > * {
        flex: 1;
      }
    }
  }

  dsfr-link {
    display: block;
    margin-block-start: 1.5rem;
  }
</style>
