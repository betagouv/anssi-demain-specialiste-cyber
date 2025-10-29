<script lang="ts">
  import type { EtapeModificationJeu } from './FormulaireDeJeu.type';

  let { etapeCourante }: { etapeCourante: EtapeModificationJeu } = $props();

  const etapes: Record<
    EtapeModificationJeu,
    { index: number; titre: string; etapeSuivante?: EtapeModificationJeu }
  > = {
    'informations-generales': {
      index: 1,
      titre: 'Informations générales',
      etapeSuivante: 'presentation',
    },
    presentation: {
      index: 2,
      titre: 'Présentation du jeu',
      etapeSuivante: 'temoignages',
    },
    temoignages: {
      index: 3,
      titre: 'Témoignages (facultatif)',
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
  stepCount={3}
></dsfr-stepper>
