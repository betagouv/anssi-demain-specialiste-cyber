<script lang="ts">
  import MiseEnAvantKitCommunication from '../composants/MiseEnAvantKitCommunication.svelte';

  type Ressource = {
    titre: string;
    image: string;
    lien: string;
    detail: string;
    duree?: string;
  };

  const lienSousTitres = (lienVideo: string) => {
    const positionDernierPoint = lienVideo.lastIndexOf('.');
    const lienSansExtension = lienVideo.slice(0, positionDernierPoint);
    return `${lienSansExtension}.vtt`;
  };

  const toutesLesRessources: Ressource[] = [
    {
      titre: 'Télécharger le livret 0 : Utilisation de CyberEnJeux',
      image: '/assets/images/cej/livret-utilisation.svg',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-0-utilisation-de-cyberenjeux.pdf',
      detail: 'PDF - 176 ko',
    },
    {
      titre: 'Télécharger le livret 1 : Former à la cybersécurité',
      image: '/assets/images/cej/livret-former.svg',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-1-former-a-la-cybersecurite.pdf',
      detail: 'PDF - 542 ko',
    },
    {
      titre:
        'Télécharger la présentation : Acculturation aux enjeux de cybersécurité',
      image: '/assets/images/cej/livret-acculturation.svg',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_presentation_eleves.pptx',
      detail: 'PPTX - 13,6 Mo',
    },
    {
      titre: 'Télécharger le livret 2 : Accompagner la création de jeux',
      image: '/assets/images/cej/livret-accompagner.svg',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-2-accompagner-la-creation-de-jeux.pdf',
      detail: 'PDF - 238 ko',
    },
    {
      titre: 'Télécharger le livret 3 : Créer un jeu',
      image: '/assets/images/cej/livret-creer.svg',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-3-creer-un-jeu-sur-la-cybersecurite.pdf',
      detail: 'PDF - 235 ko',
    },
    {
      titre: 'Télécharger les Cartes objectifs cyber',
      image: '/assets/images/cej/ressources.svg',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_cartes-objectifs-cyber.pdf',
      detail: 'PDF - 122 ko',
    },
    {
      titre: 'Présentation des fiches pédagogiques',
      duree: 'Durée : 46 min',
      detail: 'podeduc.apps.education.fr',
      image: '/assets/images/fiches_pedagogiques.avif',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/Video_webinaire_presentation.mp4',
    },
    {
      titre: 'Accompagner les élèves dans la création de jeux',
      duree: 'Durée : 67 min',
      detail: 'podeduc.apps.education.fr',
      image: '/assets/images/accompagner_les_eleves.avif',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/Video_accompagner_les_eleves.mp4',
    },
    {
      titre:
        "Retour d'expérience CyberEnjeux au lycée H. Matisse de Cugnaux (31)",
      duree: 'Durée : 2 min',
      detail: 'tube-numerique-educatif.apps.education.fr',
      image: '/assets/images/retour_experience.avif',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/Video_lycee_matisse.mp4',
    },
  ];
  const ressourcesEnseignents = toutesLesRessources.slice(0, 4);
  const ressourcesEleves = toutesLesRessources.slice(4, 6);
  const ressourcesVideos = toutesLesRessources.slice(6, 9);
</script>

<dsfr-container>
  <div class="ressources">
    <div class="ressources-enseignants">
      <hgroup>
        <h2>Ressources enseignants</h2>
        <p class="fr-text--lg description">
          Des ressources pour découvrir CyberEnJeux et guider vos élèves pas à
          pas dans la création de leurs propres jeux.
        </p>
      </hgroup>
      <div class="conteneur">
        {#each ressourcesEnseignents as ressource}
          <dsfr-card
            src={ressource.image}
            title={ressource.titre}
            href={ressource.lien}
            hasDetailEnd
            detailEnd={ressource.detail}
            lang="fr"
            size="sm"
            horizontal
            horizontal-proportion="tier"
            hasDownloadIcon
          ></dsfr-card>
        {/each}
      </div>
    </div>

    <div class="ressources-eleves">
      <hgroup>
        <h2>Ressources élèves</h2>
        <p class="fr-text--lg description">
          Un guide pour aider les élèves à créer leur jeu en autonomie,
          accompagné de 13 cartes Objectifs Cyber pour orienter le choix des
          thèmes.
        </p>
      </hgroup>
      <div class="conteneur">
        {#each ressourcesEleves as ressource}
          <dsfr-card
            src={ressource.image}
            title={ressource.titre}
            href={ressource.lien}
            hasDetailEnd
            detailEnd={ressource.detail}
            lang="fr"
            size="sm"
            horizontal
            horizontal-proportion="tier"
            hasDownloadIcon
          ></dsfr-card>
        {/each}
      </div>
    </div>

    <div class="telecharger-les-ressources">
      <dsfr-button
        markup="a"
        has-icon
        icon="download-line"
        label="Télécharger toutes les ressources"
        href="https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnJeux_toutes_ressources.zip"
      ></dsfr-button>
    </div>

    <div class="ressources-videos">
      <hgroup><h2>Découvrir CyberEnJeux en vidéos</h2></hgroup>
      <div class="conteneur">
        {#each ressourcesVideos as ressource}
          <div>
            <video controls crossorigin="anonymous" poster={ressource.image}>
              <source src={ressource.lien} type="video/mp4" />
              <track
                default
                kind="captions"
                srclang="fr"
                label="Français"
                src={lienSousTitres(ressource.lien)}
              />
            </video>
            <h3 class="fr-h6">{ressource.titre}</h3>
          </div>
        {/each}
      </div>
    </div>

    <div class="ressources-3d">
      <h2>Ressources 3D</h2>
      <p class="fr-text--lg description">
        Si votre établissement dispose d’une imprimante 3D vous pouvez
        télécharger et imprimer des accessoires en 3D gratuitement (dés, pions,
        jetons…) pour animer vos séquences CyberEnJeux. Rendez-vous sur :
        https://www.turbosquid.com
      </p>
    </div>

    <MiseEnAvantKitCommunication />
  </div>
</dsfr-container>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  h2 {
    margin: 0 0 0.5rem;
  }

  hgroup {
    margin-bottom: 2rem;

    .description {
      margin: 0;
    }
  }

  .ressources {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 3rem 0 4.5rem;

    @include a-partir-de(lg) {
      gap: 3rem;
    }
  }

  .telecharger-les-ressources {
    margin: 0 auto;
    padding: 1rem auto;
    width: clamp(200px, 100%, 192px);

    @include a-partir-de(sm) {
      width: clamp(200px, 100%, 310px);
    }
  }

  .conteneur {
    display: grid;
    grid-template-columns: minmax(200px, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;

    .fr-h6 {
      margin-bottom: 0.5rem;
    }

    video {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      width: 100%;
      justify-content: center;
      align-items: center;
      align-self: stretch;
      aspect-ratio: 16/9;
      margin-bottom: 0.5rem;
    }

    @include a-partir-de(sm) {
      grid-template-columns: repeat(2, minmax(200px, 1fr));
    }

    @include a-partir-de(lg) {
      gap: 1.5rem;
    }
  }

  .ressources-videos .conteneur {
    @include a-partir-de(sm) {
      grid-template-columns: repeat(2, minmax(200px, 1fr));
    }

    @include a-partir-de(md) {
      grid-template-columns: repeat(3, minmax(200px, 1fr));
    }
  }
</style>
