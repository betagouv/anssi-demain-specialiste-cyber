<script lang="ts">
  import { libelleThematique } from '../jeux/thematiques';
  import type { Thematique } from './jeu';

  type Props = {
    taille: 'sm' | 'md';
    thematiques: Thematique[];
  };

  type CouleurDeBadge =
    | 'purple-glycine'
    | 'green-tilleul-verveine'
    | 'green-archipel'
    | 'green-emeraude'
    | 'pink-tuile'
    | 'blue-cumulus'
    | 'beige-gris-galet'
    | 'blue-ecume'
    | 'green-bourgeon'
    | 'brown-cafe-creme'
    | 'orange-terre-battue'
    | 'pink-macaron'
    | 'yellow-tournesol'
    | 'brown-caramel'
    | 'green-menthe'
    | 'brown-opera'
    | 'yellow-moutarde';

  const couleursThematiques: Record<Thematique, CouleurDeBadge> = {
    'comportements-numeriques': 'purple-glycine',
    cyberharcelement: 'green-archipel',
    'gestion-crise-cyber': 'pink-macaron',
    'lutte-manipulation-information': 'blue-ecume',
    'menace-cyber': 'brown-cafe-creme',
    orientation: 'orange-terre-battue',
    'techniques-securite-numerique': 'yellow-tournesol',
    'valoriser-talents-feminins': 'brown-opera',
  };

  const { taille, thematiques }: Props = $props();
</script>

<dsfr-badges-group
  badges={thematiques.map((thematique) => ({
    label: libelleThematique(thematique),
    accent: couleursThematiques[thematique],
  }))}
  size={taille}
></dsfr-badges-group>

<style lang="scss">
</style>
