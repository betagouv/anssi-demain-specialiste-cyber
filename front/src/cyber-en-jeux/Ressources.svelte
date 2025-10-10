<script lang="ts">
  import MiseEnAvant from '../MiseEnAvant.svelte';

  const toutesLesRessources = [
    {
      titre: 'Télécharger le livret 0 : Utilisation de CyberEnJeux',
      image: '/assets/images/cej/livret-utilisation.svg',
      lien: 'https://ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-0-utilisation-de-cyberenjeux.pdf',
      detail: 'PDF - 176 ko',
    },
    {
      titre: 'Télécharger le livret 1 : Former à la cybersécurité',
      image: '/assets/images/cej/livret-former.svg',
      lien: 'https://ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-1-former-a-la-cybersecurite.pdf',
      detail: 'PDF - 542 ko',
    },
    {
      titre:
        'Télécharger la présentation : Acculturation aux enjeux de cybersécurité',
      image: '/assets/images/cej/livret-acculturation.svg',
      lien: 'https://ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_presentation_eleves.pptx',
      detail: 'PPTX - 13,6 Mo',
    },
    {
      titre: 'Télécharger le livret 2 : Accompagner la création de jeux',
      image: '/assets/images/cej/livret-accompagner.svg',
      lien: 'https://ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-2-accompagner-la-creation-de-jeux.pdf',
      detail: 'PDF - 238 ko',
    },
    {
      titre: 'Télécharger le livret 3 : Créer un jeu',
      image: '/assets/images/cej/livret-creer.svg',
      lien: 'https://ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_livret-3-creer-un-jeu-sur-la-cybersecurite.pdf',
      detail: 'PDF - 235 ko',
    },
    {
      titre: 'Télécharger les Cartes objectifs cyber',
      image: '/assets/images/cej/ressources.svg',
      lien: 'https://ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnjeux_cartes-objectifs-cyber.pdf',
      detail: 'PDF - 122 ko',
    },
    {
      titre: 'Présentation des fiches pédagogiques',
      duree: 'Durée : 46 min',
      detail: 'podeduc.apps.education.fr',
      lien: 'https://podeduc.apps.education.fr/video/25355-webinaire-cyberenjeux-formation-des-eleves-a-la-cybersecurite-anssi/',
    },
    {
      titre: 'Accompagner les élèves dans la création de jeux',
      duree: 'Durée : 67 min',
      detail: 'podeduc.apps.education.fr',
      lien: 'https://podeduc.apps.education.fr/video/27840-cyberenjeux-accompagner-la-creation-de-jeux-en-cybersecurite/',
    },
    {
      titre:
        "Retour d'expérience CyberEnjeux au lycée H. Matisse de Cugnaux (31)",
      duree: 'Durée : 2 min',
      detail: 'tube-numerique-educatif.apps.education.fr',
      lien: 'https://tube-numerique-educatif.apps.education.fr/w/b118cd75-7957-4ec0-b527-476e9a9cb2f8',
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
        <p class="description">
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
            download
            lang="fr"
            assess
          ></dsfr-card>
        {/each}
      </div>
    </div>

    <div class="ressources-eleves">
      <hgroup>
        <h2>Ressources élèves</h2>
        <p class="description">
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
            download
            lang="fr"
            assess
          ></dsfr-card>
        {/each}
      </div>
    </div>

    <div class="telecharger-les-ressources">
      <dsfr-button
        markup="a"
        label="Télécharger toutes les ressources"
        href="https://ressources-cyber.cellar-c2.services.clever-cloud.com/CyberEnJeux_toutes_ressources.zip"
      ></dsfr-button>
    </div>

    <div class="ressources-videos">
      <h2>Découvrir CyberEnJeux en vidéos</h2>
      <div class="conteneur">
        {#each ressourcesVideos as ressource}
          <dsfr-card
            src="/assets/images/video-generique.svg"
            title={ressource.titre}
            hasDetailStart
            detailStart={ressource.duree}
            hasDetailEnd
            detailEnd={ressource.detail}
            href={ressource.lien}
            blank
          ></dsfr-card>
        {/each}
      </div>
    </div>

    <div class="ressources-3d">
      <h2>Ressources 3D</h2>
      <p class="description">
        Si votre établissement dispose d’une imprimante 3D vous pouvez
        télécharger et imprimer des accessoires en 3D gratuitement (dés, pions,
        jetons…) pour animer vos séquences CyberEnJeux. Rendez-vous sur :
        https://www.turbosquid.com
      </p>
    </div>

    <MiseEnAvant
      titre="Demain&ZeroWidthSpace;Spécialiste&ZeroWidthSpace;Cyber"
      illustration={{
        lien: '/assets/images/cej/hacker-ethique.png',
        alt: 'Hacker éthique',
      }}
      liens={[
        {
          libelle: 'Télécharger les 6 affiches métiers',
          detail: 'ZIP - 3,3 Mo',
          lien: 'https://ressources-cyber.cellar-c2.services.clever-cloud.com/DemainSpecialisteCyber_Affiches_et_visuels.zip',
          telechargement: true,
        },
        {
          libelle: 'Télécharger le kit de communication',
          detail: 'ZIP - 47,8 Mo',
          lien: 'https://ressources-cyber.cellar-c2.services.clever-cloud.com/DemainSpecialisteCyber_Kit_Communication.zip',
          telechargement: true,
        },
      ]}
    >
      <p>
        DemainSpécialisteCyber est une campagne nationale co-construite par
        l’ANSSI et son laboratoire d’innovation, le Ministère de l’Education
        Nationale et de la Jeunesse et le Campus Cyber, en vue de valoriser la
        cybersécurité et ses métiers auprès des collégien/nes, lycéen/nes mais
        aussi étudiant/es.
      </p>
    </MiseEnAvant>
  </div>
</dsfr-container>

<style lang="scss">
  @use '../points-de-rupture' as *;

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

    @include a-partir-de(sm) {
      grid-template-columns: repeat(2, minmax(200px, 1fr));
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
