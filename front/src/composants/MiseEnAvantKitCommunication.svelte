<svelte:options
  customElement={{
    tag: 'dsc-mise-en-avant-kit-communication',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import { TITRE_DSC_SECABLE } from '../constantes';
  import MiseEnAvant from './MiseEnAvant.svelte';
</script>

<MiseEnAvant
  titre={TITRE_DSC_SECABLE}
  illustration={{
    lien: '/assets/images/cej/hacker-ethique.png',
    alt: 'Hacker éthique',
  }}
  liens={[
    {
      libelle: 'Télécharger les 6 affiches métiers',
      detail: 'ZIP - 3,3 Mo',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/DemainSpecialisteCyber_Affiches_et_visuels.zip',
      telechargement: true,
    },
    {
      libelle: 'Télécharger le kit de communication',
      detail: 'ZIP - 47,8 Mo',
      lien: 'https://prod-ressources-cyber.cellar-c2.services.clever-cloud.com/DemainSpecialisteCyber_Kit_Communication.zip',
      telechargement: true,
    },
  ]}
>
  <p class="fr-text--lg">
    Devenez relai de {TITRE_DSC_SECABLE} en associant la marque {TITRE_DSC_SECABLE}
    à vos actions en faveur de la formation des jeunes à la cybersécurité et la découverte
    de ses métiers.
  </p>
</MiseEnAvant>
