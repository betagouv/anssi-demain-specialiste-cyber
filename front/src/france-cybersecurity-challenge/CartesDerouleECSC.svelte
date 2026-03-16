<script lang="ts">
</script>

<div class="cartes">
  <dsfr-card
    title="Mode «&#8239;Jeopardy&#8239;»"
    description="En mode «&#8239;Jeopardy&#8239;» à l'image du FCSC. Des épreuves sont proposées à l'ensemble des équipes et sont résolues par chaque équipe."
    noLink
    hasTag
    enlarge={false}
  >
    <dsfr-tags-group
      slot="tagsgroup"
      tags={[{ label: 'Jour 1' }]}
      groupMarkup="div"
    ></dsfr-tags-group>
  </dsfr-card>
  <dsfr-card
    title="Mode «&#8239;Attaque / Défense&#8239;»"
    description="Les équipes s'affrontent en réseau autour d'un système d'information : chacune se voit confiée la gestion d'un même système d'information dans laquelle des vulnérabilités patchables ont été introduites. La mission de chaque équipe : protéger son système et exploiter les vulnérabilités non corrigées des SI des équipes adverses !"
    noLink
    hasTag
    enlarge={false}
  >
    <dsfr-tags-group
      slot="tagsgroup"
      tags={[{ label: 'Jour 2' }]}
      groupMarkup="div"
    ></dsfr-tags-group>
  </dsfr-card>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .cartes {
    margin-top: 1.5rem;
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(lg) {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
