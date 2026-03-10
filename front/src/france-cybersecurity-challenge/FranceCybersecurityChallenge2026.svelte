<script lang="ts">
  import CarteParticipationFcsc from './CarteParticipationFcsc.svelte';
</script>

<dsfr-container>
  <div class="contenu">
    <h1>Le France Cybersecurity Challenge 2026</h1>
    <section>
      <h3>Catégories de participants(es)</h3>
      <div class="categories">
        <dsfr-tile
          title="Catégorie Junior"
          size="sm"
          actionMarkup="false"
          noLink={true}
          enlarge
          hasDescription={true}
          horizontal={true}
        >
          <ul slot="description">
            <li>Être né(e)s en 2005, 2006, 2007, 2008, 2009, 2010 ou 2011.</li>
            <li>Être de nationalité française.</li>
            <li>
              Candidater pour intégrer la Team France et participer à l’ECSC.
            </li>
          </ul>
        </dsfr-tile>
        <dsfr-tile
          title="Catégorie Senior"
          size="sm"
          actionMarkup="false"
          noLink={true}
          enlarge
          hasDescription={true}
          horizontal={true}
        >
          <ul slot="description">
            <li>Être né(e)s en 2000, 2001, 2002, 2003 ou 2004.</li>
            <li>Être de nationalité française.</li>
            <li>
              Candidater pour intégrer la Team France et participer à l’ECSC.
            </li>
          </ul>
        </dsfr-tile>
        <dsfr-tile
          title="Hors catégorie"
          size="sm"
          actionMarkup="false"
          noLink={true}
          enlarge
          hasDescription={true}
          description='Vous ne remplissez pas un ou plusieurs des critères ci-dessus ou vous ne souhaitez pas candidater pour intégrer la "Team France".'
          horizontal={true}
        >
        </dsfr-tile>
      </div>
    </section>
    <CarteParticipationFcsc />
  </div>
</dsfr-container>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .contenu {
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;

    .categories {
      display: grid;
      gap: 1.5rem;

      @include a-partir-de(lg) {
        grid-template-columns: 1fr 1fr;
        dsfr-tile:nth-child(3) {
          grid-column: 1/3;
        }
      }

      dsfr-tile {
        ul {
          order: 3;
          padding-left: 1rem;
          margin-top: 0.5rem;

          li {
            list-style-type: disc;
          }
        }
      }
    }
  }
</style>
