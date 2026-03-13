<script lang="ts">
  import { onMount } from 'svelte';

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
  title="Rejoins la communauté France Cybersecurity Challenge sur Discord"
  hasDescription={false}
  src="/assets/images/fcsc-x-discord.svg"
  href="https://discord.com/invite/rwZY6hh8z8"
  blank
  hasTag
  hasDetailEnd
  detailEnd="Accéder au Discord"
  enlarge={true}
  horizontal={!estMobile}
>
  <dsfr-tags-group
    slot="tagsgroup"
    hasIcon
    tags={[{ label: '+5800 membres', id: 'membres', icon: 'team-fill' }]}
    size="md"
    groupMarkup="div"
  ></dsfr-tags-group>
</dsfr-card>
