<script lang="ts">
  import type { CouleurDeBadge } from '../badge.type';
  import { libelleThematique } from '../jeux/thematiques';
  import type { Thematique } from './jeu';

  type Props = {
    taille: 'sm' | 'md';
    thematiques: Thematique[];
  };

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
