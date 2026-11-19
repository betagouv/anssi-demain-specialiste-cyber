<script lang="ts">
  type Precaution = {
    titre: string;
    pictogram: string;
  };

  const precautions: Precaution[] = [
    {
      titre: 'Protège tes comptes : mots de passe longs et double authentification',
      pictogram: '/artwork/icone-cadenas.svg',
    },
    {
      titre: 'Installe uniquement des applis officielles et fais les mises à jour',
      pictogram: '/artwork/icone-succes.svg',
    },
    {
      titre: 'Sauvegarde tes données importantes sur un support déconnecté',
      pictogram: '/artwork/icone-institution-publique.svg',
    },
    { titre: 'Évite les réseaux wifi publics sans mot de passe', pictogram: '/artwork/icone-institution-publique.svg' },
    {
      titre: 'Protège ton téléphone et ta tablette comme un ordinateur',
      pictogram: '/artwork/icone-protection-donnees.svg',
    },
    {
      titre: "Partage le moins possible d'informations personnelles en ligne",
      pictogram: '/artwork/icone-institution-publique.svg',
    },
  ];
</script>

<section id="precautions">
  <dsfr-container>
    <div class="conteneur">
      <div class="entete-section">
        <h2 class="entete-titre fr-h1">6 précautions pour te protéger et protéger tes proches</h2>
        <p class="entete-chapeau texte-article-lg">
          Pas besoin d'être expert&nbsp;: ces mesures essentielles valent pour tout le monde.
        </p>
      </div>

      <div class="liste-precautions">
        {#each precautions as precaution}
          <dsfr-tile title={precaution.titre} size="md" no-link action-markup="false">
            <img src={precaution.pictogram} alt="" class="pictogramme" slot="pictogram" />
          </dsfr-tile>
        {/each}
      </div>
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  .conteneur {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-block: 4.5rem;
  }

  .entete-section,
  .liste-precautions {
    max-width: taille-pour-colonnes(10);
  }

  .liste-precautions {
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include a-partir-de(lg) {
      grid-template-columns: repeat(3, 1fr);
      margin-inline: auto;
    }
  }

  .pictogramme {
    width: 5rem;
  }
</style>
