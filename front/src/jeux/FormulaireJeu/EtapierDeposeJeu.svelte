<script lang="ts">
  import type { EtapeDeposeJeu } from './FormulaireDeJeu.type';

  let { etapeCourante }: { etapeCourante: EtapeDeposeJeu } = $props();

  const etapes: Record<
    EtapeDeposeJeu,
    { index: number; titre: string; etapeSuivante?: EtapeDeposeJeu }
  > = {
    'informations-generales': {
      index: 1,
      titre: 'Informations générales',
      etapeSuivante: 'presentation',
    },
    presentation: {
      index: 2,
      titre: 'Présentation du jeu',
      etapeSuivante: 'photos',
    },
    photos: {
      index: 3,
      titre: 'Photos',
      etapeSuivante: 'temoignages',
    },
    temoignages: {
      index: 4,
      titre: 'Témoignages (facultatif)',
      etapeSuivante: 'evaluation',
    },
    evaluation: {
      index: 5,
      titre: 'Votre avis nous intéresse',
    },
  };

  const infosEtapeCourant = $derived.by(() => etapes[etapeCourante]);
  const titreEtapeSuivante = $derived.by(() =>
    infosEtapeCourant.etapeSuivante
      ? etapes[infosEtapeCourant.etapeSuivante].titre
      : '',
  );
</script>

<dsfr-stepper
  title={infosEtapeCourant.titre}
  nextStep={titreEtapeSuivante}
  currentStep={infosEtapeCourant.index}
  stepCount={5}
></dsfr-stepper>
