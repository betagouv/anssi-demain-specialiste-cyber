<script lang="ts">
  import { onMount } from 'svelte';

  const boutons = [
    {
      label: 'Participer au challenge',
      kind: 'primary',
      markup: 'a',
      href: 'https://fcsc.fr/fr/',
      blank: true,
    },
  ];

  let estMobile = false;
  onMount(() => {
    const mql = window.matchMedia('(max-width: 992px)');
    mql.addEventListener('change', (e: MediaQueryListEvent) => {
      estMobile = e.matches;
    });
    estMobile = mql.matches;
  });
</script>

<dsfr-card
  title="Participe au France Cybersecurity Challenge 2026&nbsp;!"
  description="Les inscriptions au France Cybersecurity Challenge (FCSC) ouvrent la semaine du 23 mars et restent possibles jusqu’au dernier jour du challenge 😉. Le FCSC se déroulera du 3 avril 2026 (ouverture) au 12 avril (fin)."
  src="/assets/images/logo-fcsc-2026-contour-blanc.svg"
  hasDetailStartIcon
  href="https://fcsc.fr/fr/"
  blank
  detailStartIcon="mac-fill"
  hasDetailStart
  detailStart="À distance"
  hasBadge
  hasButtons
  enlarge={false}
  horizontal={!estMobile}
  noLink
>
  <dsfr-badges-group
    slot="badgesgroup"
    badges={[{ label: 'du 3 au 12 avril 2026', accent: 'green-archipel' }]}
    size="md"
  ></dsfr-badges-group>
  <dsfr-buttons-group slot="buttonsgroup" buttons={boutons}
  ></dsfr-buttons-group>
</dsfr-card>

<style lang="scss">
</style>
