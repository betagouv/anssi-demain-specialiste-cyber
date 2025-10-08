<script lang="ts">
  import { libelleThematique } from '../jeux/thematiques';

  type Props = {
    taille: 'sm' | 'md';
    thematiques: string[];
  };

  const couleursDeBadge = [
    'purple-glycine',
    'green-tilleul-verveine',
    'green-archipel',
    'green-emeraude',
    'pink-tuile',
    'blue-cumulus',
    'beige-gris-galet',
    'blue-ecume',
    'green-bourgeon',
    'brown-cafe-creme',
    'orange-terre-battue',
    'pink-macaron',
    'yellow-tournesol',
    'brown-caramel',
    'green-menthe',
    'brown-opera',
    'yellow-moutarde',
  ];

  const { taille, thematiques }: Props = $props();
</script>

<dsfr-badges-group
  badges={thematiques.map((thematique, index) => ({
    label: libelleThematique(thematique),
    accent: couleursDeBadge[index % couleursDeBadge.length],
  }))}
  size={taille}
></dsfr-badges-group>

<style lang="scss">
</style>
